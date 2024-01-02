using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace AzureVideoChat.Plugins.ChatPlugins;

public static class ChatPluginUtilities
{
    public static string ExtractChatHistory(string history, int tokenLimit)
    {
        if (history.Length > tokenLimit)
        {
            history = history.Substring(history.Length - tokenLimit);
        }

        return history;
    }

    public static List<string> ExtractLinks(string result, string chatContextText)
    {
        const string pattern = @"YouTube ID: (\w+)-(\d{2}_\d{2}_\d{2})";
        var youtubeLinks = new List<string>();
        var top3Links = new List<string>();
        var lines = chatContextText.Split('\n');

        int currentIndex = 0;
        foreach (var line in lines)
        {
            if (line.Contains("Transcript from YouTube ID:"))
            {
                currentIndex++;
                var match = Regex.Match(line, pattern);
                if (match.Success)
                {
                    var youtubeId = match.Groups[1].Value;
                    var timecode = match.Groups[2].Value;
                    var link = CreateYoutubeLink(youtubeId, timecode);

                    if (result.Contains(youtubeId))
                    {
                        youtubeLinks.Add(link);
                    }

                    if (currentIndex <= 3)
                    {
                        top3Links.Add(link);
                    }
                }
            }
        }

        return youtubeLinks.Any() ? youtubeLinks : top3Links;
        }

        private static string CreateYoutubeLink(string youtubeId, string timecode)
        {
            var timeParts = timecode.Split('_').Select(int.Parse).ToArray();
            int totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
            return $"https://www.youtube.com/embed/{youtubeId}?start={totalSeconds}";
        }
    

    public static string ReplaceLinks(string result, List<string> youtubeLinks)
    {
        if (result.Contains("https://")) return result;
        string updatedResult = result;
        foreach (string youtubeLink in youtubeLinks)
        {
            Match match = Regex.Match(youtubeLink, @"https://www\.youtube\.com/embed/(?<youtubeid>[^?]+)");
            if (!match.Success) continue; 
            string youtubeId = match.Groups["youtubeid"].Value;
            string pattern = $@"(?<!=""|')(?<!<a href[^>]*?){Regex.Escape(youtubeId)}(?!=""|')(?!.*?</a>)";
            string replacement = $@"<a target=""_blank"" href=""{youtubeLink.Replace("/embed/", "/v/")}"">{youtubeId}</a>";

            updatedResult = Regex.Replace(updatedResult, pattern, replacement);
        }
        return updatedResult;
    }
}
