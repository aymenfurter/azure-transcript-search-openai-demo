using Microsoft.SemanticKernel.Orchestration;

namespace AzureVideoChat.Services;

public class ChatServiceResponse
{
    public ContextVariables ContextVariables { get; set; }
    public KernelResult Result { get; set; }
}
