using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace AzureVideoChat.Extensions;
public class PropertyTrimmer
{
    public static void TrimStringProperties<T>(T obj) where T : class
    {
        Queue<object> targets = new Queue<object>();
        targets.Enqueue(obj);

        while (targets.Count > 0)
        {
            object target = targets.Dequeue();
            ProcessObjectProperties(target, targets);
        }
    }

    private static void ProcessObjectProperties(object obj, System.Collections.Generic.Queue<object> targets)
    {
        var properties = obj.GetType().GetProperties().Where(p => p.CanRead && p.CanWrite);

        foreach (var property in properties)
        {
            if (TryTrimStringProperty(obj, property)) continue;

            EnqueueNonBuiltInNonEnumProperty(obj, property, targets);
        }
    }

    private static bool TryTrimStringProperty(object obj, System.Reflection.PropertyInfo property)
    {
        if (property.PropertyType != typeof(string) || property.GetValue(obj) is not string stringValue)
            return false;

        property.SetValue(obj, stringValue.Trim());
        return true;
    }

    private static void EnqueueNonBuiltInNonEnumProperty(object obj, PropertyInfo property, Queue<object> targets)
    {
        if (property.PropertyType.IsEnum || property.PropertyType.Namespace == "System") return;

        var value = property.GetValue(obj);
        if (value != null)
            targets.Enqueue(value);
    }
}
