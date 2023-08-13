// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
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
        private readonly ChatService _chatService;
        private readonly BotState _conversationState;

        public TeamsBot(ChatService chatService, ConversationState conversationState)
        {
            _chatService = chatService ?? throw new ArgumentNullException(nameof(chatService));
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
                chatResult = await _chatService.ExecuteChatAsync(chatRequest);
            }
            catch
            {
                await turnContext.SendActivityAsync("An error occurred while processing the request.", cancellationToken: cancellationToken);
                return;
            }

            ChatResponse reply = _chatService.CreateChatResponse(chatResult);
            var links = reply.Variables.FirstOrDefault(kvp => kvp.Key == "link").Value;
            var replyText = reply.Value;
            replyText = ConvertLinksToMarkdown(replyText);

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
        public static string ConvertLinksToMarkdown(string html)
        {
            if (string.IsNullOrEmpty(html))
            {
                return string.Empty;
            }

            string pattern = "<a [^>]*href=[“\"](https?[^“\"]+)[“\"][^>]*>([^<]+)<\\/a>";
            return Regex.Replace(html, pattern, "[$2]($1)");
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
    }
}
