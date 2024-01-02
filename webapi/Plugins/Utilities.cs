//Copyright (c) Microsoft. All rights reserved.

using Microsoft.KernelMemory.AI.Tokenizers.GPT3;
using Microsoft.SemanticKernel.Orchestration;

namespace AzureVideoChat.Plugins;

/// <summary>
/// Utility methods for skills.
/// </summary>
internal static class Utilities
{
    /// <summary>
    /// Calculate the number of tokens in a string.
    /// </summary>
    internal static int TokenCount(string text) => GPT3Tokenizer.Encode(text).Count;
}
