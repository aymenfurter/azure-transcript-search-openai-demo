// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CopilotChat.Skills.YouTube;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.SkillDefinition;
using SemanticKernel.Service.CopilotChat.Controllers;
using SemanticKernel.Service.CopilotChat.Skills.ChatSkills;
using SemanticKernel.Service.Models;

namespace TeamsBot.Bots
{
    public class TeamsBot : ActivityHandler
    {
        private readonly IKernel _chatKernel;
        private readonly Planner _chatPlanner;
        private const string SkillName = "ChatSkill";
        private const string FunctionName = "Chat";

        private readonly BotState _conversationState;


        public TeamsBot(IKernel chatKernel, Planner chatPlanner, ConversationState conversationState)
        {
            _chatKernel = chatKernel ?? throw new ArgumentNullException(nameof(chatKernel));
            _chatPlanner = chatPlanner ?? throw new ArgumentNullException(nameof(chatPlanner));
            _conversationState = conversationState;
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            var conversationStateAccessors = _conversationState.CreateProperty<ConversationData>(nameof(ConversationData));
            var conversationData = await conversationStateAccessors.GetAsync(turnContext, () => new ConversationData());

            conversationData.ConversationHistory.Add(turnContext.Activity.Text);
            var variables = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("History", string.Join("\n\n", conversationData.ConversationHistory))
            };

            var chatRequest = new ChatRequest { Input = turnContext.Activity.Text, Variables = variables };
            

            await turnContext.SendActivitiesAsync(new Activity[] { new Activity { Type = ActivityTypes.Typing } }, cancellationToken);

            SKContext chatResult;
            try
            {
                chatResult = await ExecuteChatAsync(_chatKernel, _chatPlanner, chatRequest);
            }
            catch
            {
                await turnContext.SendActivityAsync("An error occurred while processing the request.", cancellationToken: cancellationToken);
                return;
            }

            ChatResponse reply = CreateChatResponse(chatResult); 
            var links = reply.Variables.FirstOrDefault(kvp => kvp.Key == "link").Value;
            var replyText = reply.Value; 
            
            await turnContext.SendActivityAsync(MessageFactory.Text(replyText), cancellationToken);

            if (!string.IsNullOrEmpty(links) && !links.Contains("QH2-TGUlwu4"))
            {
                links = links.Replace(" ", Environment.NewLine);
                links = links.Replace("/embed", "/v");
                var youtubeLinks = links.Split(Environment.NewLine);

                var card = new HeroCard
                {
                    Title = "Sources",
                    Subtitle = "Relevant YouTube Links",
                    Buttons = youtubeLinks.Select(link => new CardAction(ActionTypes.OpenUrl, link, value: link)).ToList()
                };

                var attachment = MessageFactory.Attachment(card.ToAttachment());
                await turnContext.SendActivityAsync(attachment, cancellationToken);
            }

            await _conversationState.SaveChangesAsync(turnContext, false, cancellationToken);
        }


        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            var welcomeText = "Hello and welcome!";
            foreach (var member in membersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text(welcomeText, welcomeText), cancellationToken);
                }
            }
        }

        // TODO: Remove duplicate code below
        public async Task<SKContext> ExecuteChatAsync(
            IKernel chatKernel,
            Planner chatPlanner,
            ChatRequest chatRequest)
        {
            var chatContext = CreateChatContext(chatRequest);

            await RegisterSkillsAsync(chatPlanner, chatContext);

            ISKFunction? functionToInvoke = GetFunctionToInvoke(chatKernel);
            if (functionToInvoke == null)
            {
                throw new InvalidOperationException($"Failed to find {SkillName}/{FunctionName} on server");
            }

            SKContext chatResult = await ExecuteChatFunctionAsync(chatKernel, chatContext, functionToInvoke);
            if (chatResult.ErrorOccurred)
            {
                throw new Exception("Error occurred while executing chat function: " + CreateErrorResponse(chatResult));
            }

            return chatResult;
        }


        private ContextVariables CreateChatContext(ChatRequest chatRequest)
        {
            var chatContext = new ContextVariables(chatRequest.Input);
            foreach (var variable in chatRequest.Variables)
            {
                chatContext.Set(variable.Key, variable.Value);
            }

            return chatContext;
        }

        private async Task RegisterSkillsAsync(Planner planner, ContextVariables variables)
        {
            planner.Kernel.ImportSkill(new YouTubePlugin(), "YouTube");
        }

        private ISKFunction? GetFunctionToInvoke(IKernel chatKernel)
        {
            try
            {
                return chatKernel.Skills.GetFunction(SkillName, FunctionName);
            }
            catch (KernelException ke)
            {
                return null;
            }
        }

        private async Task<SKContext> ExecuteChatFunctionAsync(IKernel chatKernel, ContextVariables chatContext, ISKFunction functionToInvoke)
        {
            return await chatKernel.RunAsync(chatContext, functionToInvoke);
        }

        private string CreateErrorResponse(SKContext chatResult)
        {
            if (chatResult.LastException is AIException aiException && aiException.Detail is not null)
            {
                return string.Concat(aiException.Message, " - Detail: ", aiException.Detail);
            }

            return chatResult.LastErrorDescription;
        }

        private ChatResponse CreateChatResponse(SKContext chatResult)
        {
            return new ChatResponse { Value = chatResult.Result, Variables = chatResult.Variables.Select(v => new KeyValuePair<string, string>(v.Key, v.Value)) };
        }
    }
}
