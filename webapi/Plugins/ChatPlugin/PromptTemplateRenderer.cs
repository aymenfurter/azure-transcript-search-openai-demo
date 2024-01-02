using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using AzureVideoChat.Options;
using Microsoft.SemanticKernel.TemplateEngine;
using Microsoft.SemanticKernel.TemplateEngine.Basic;
using Microsoft.SemanticKernel.Orchestration;

namespace AzureVideoChat.Plugins.ChatPlugins;

public class PromptTemplateRenderer
{
    private readonly PromptsOptions _promptOptions;

    public PromptTemplateRenderer(PromptsOptions promptOptions)
    {
        _promptOptions = promptOptions;
    }

    public async Task<string> RenderPromptAsync(SKContext context)
    {
        var promptTemplateFactory = new BasicPromptTemplateFactory();
        var promptTemplate = promptTemplateFactory.Create(_promptOptions.SystemChatPrompt, new PromptTemplateConfig());
        return await promptTemplate.RenderAsync(context);
    }
}
