using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Orchestration;

namespace AzureVideoChat.Plugins.SortPlugin
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
            var skillsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Plugins");
            var skill = this._kernel.ImportSemanticSkillFromDirectory(skillsDirectory, "SortPlugin");

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