using Microsoft.SemanticKernel;

namespace SemanticKernel.Service.CopilotChat.Skills.ChatSkills;

public class Planner
{
    public IKernel Kernel { get; }

    public Planner(IKernel plannerKernel)
    {
        this.Kernel = plannerKernel;
    }
}
