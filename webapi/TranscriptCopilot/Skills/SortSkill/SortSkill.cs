using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI.ChatCompletion;
using Microsoft.SemanticKernel.Orchestration;

namespace SemanticKernel.Service.CopilotChat.Skills.SortSkill
{
    public enum SortType
    {
        NONE,
        RECENT,
        MONTH,
        YEAR
    }

    public class SortHandler
    {
        private readonly IKernel _kernel;

        public SortHandler(IKernel kernel)
        {
            _kernel = kernel;
        }

        public async Task<SortType> ProcessUserIntent(string userIntent)
        {
            var context = CreateContext(userIntent);
            var skillsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "TranscriptCopilot/Skills");
            var skill = this._kernel.ImportSemanticSkillFromDirectory(skillsDirectory, "SortSkill");

            var sortString = await this._kernel.RunAsync(skill["Sort"], context);
            return ParseSortType(sortString.ToString());
        }

        private ContextVariables CreateContext(string userIntent)
        {
            var context = new ContextVariables();
            context.Set("query", userIntent);
            context.Set("date", DateTime.Now.ToString("yyyy-MM-dd"));
            return context;
        }

        private SortType ParseSortType(string sortString)
        {
            if(Enum.TryParse(sortString, out SortType sortType))
            {
                return sortType;
            }
            return SortType.NONE;
        }
    }
}