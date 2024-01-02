using System.Collections.Generic;

namespace AzureVideoChat.Controllers {
    public class ConversationData
    {
        public List<string> ConversationHistory { get; set; } = new List<string>();
    }
}