using Microsoft.SemanticKernel.SkillDefinition;
using Microsoft.SemanticKernel.Orchestration;
using System.Linq;

namespace CopilotChat.Skills.YouTube
{
    public class YouTubePlugin 
    {
        [SKFunction("Used if you want to link to a specific YouTube Video. Only use this skill if you already know what the youtubeid is (e.g. QH2-TGUlwu4))")]
        [SKFunctionContextParameter(Name = "youtubeid", Description = "ID of the YouTube video")]
        [SKFunctionContextParameter(Name = "timestamp", Description = "Timestamp to jump to (e.g. 00:01:00)")]
        public string LinkYouTubeVideo(SKContext context)
        {
            string youtubeid = context["youtubeid"];
            string timestamp = context["timestamp"];

            // if support is 00:02, make it to 00:00:02
            if (timestamp.Count(c => c == ':') == 1)
            {
                timestamp = "00:" + timestamp;
            }

            if (string.IsNullOrEmpty(timestamp))
            {
                return $"https://www.youtube.com/embed/{youtubeid}";
            }
            var timeParts = timestamp.Split(':').Select(int.Parse).ToArray();
             int totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
            return $"https://www.youtube.com/embed/{youtubeid}?start={totalSeconds}";
        }
    }
}
