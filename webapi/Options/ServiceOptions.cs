// Copyright (c) Microsoft. All rights reserved.

using System;
using System.ComponentModel.DataAnnotations;

namespace SemanticKernel.Service.Options;

/// <summary>
/// Configuration options for the CopilotChat service.
/// </summary>
public class ServiceOptions
{
    public const string PropertyName = "Service";

    public string? SemanticSkillsDirectory { get; set; }
}
