// Copyright (c) Microsoft. All rights reserved.

using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace AzureVideoChat.Options;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
internal sealed class RequiredOnPropertyValueAttribute : ValidationAttribute
{
    public string OtherPropertyName { get; }

    public object? OtherPropertyValue { get; }

    public bool NotEmptyOrWhitespace { get; }

    public RequiredOnPropertyValueAttribute(string otherPropertyName, object? otherPropertyValue, bool notEmptyOrWhitespace = true)
    {
        this.OtherPropertyName = otherPropertyName;
        this.OtherPropertyValue = otherPropertyValue;
        this.NotEmptyOrWhitespace = notEmptyOrWhitespace;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        PropertyInfo? otherPropertyInfo = validationContext.ObjectType.GetRuntimeProperty(this.OtherPropertyName);

        if (otherPropertyInfo == null)
        {
            return new ValidationResult($"Unknown other property name '{this.OtherPropertyName}'.");
        }

        if (otherPropertyInfo.GetIndexParameters().Length > 0)
        {
            throw new ArgumentException($"Other property not found ('{validationContext.MemberName}, '{this.OtherPropertyName}').");
        }

        object? otherPropertyValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance, null);

        if (Equals(this.OtherPropertyValue, otherPropertyValue))
        {
            if (value == null)
            {
                return new ValidationResult($"Property '{validationContext.DisplayName}' is required when '{this.OtherPropertyName}' is {this.OtherPropertyValue}.");
            }
            else if (this.NotEmptyOrWhitespace && string.IsNullOrWhiteSpace(value.ToString()))
            {
                return new ValidationResult($"Property '{validationContext.DisplayName}' cannot be empty or whitespace when '{this.OtherPropertyName}' is {this.OtherPropertyValue}.");
            }
            else
            {
                return ValidationResult.Success;
            }
        }

        return ValidationResult.Success;
    }
}
