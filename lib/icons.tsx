import * as LucideIcons from "lucide-react";
import { createElement } from "react";

/**
 * Utility function to dynamically render icons from Lucide React
 * based on the icon name provided in the configuration
 *
 * @param iconName The name of the icon from Lucide React
 * @param props Additional props to pass to the icon component
 * @returns The rendered icon component or null if icon not found
 */
export function DynamicIcon({
  iconName,
  ...props
}: {
  iconName: string;
  [key: string]: any;
}) {
  // Check if the icon exists in Lucide Icons
  const IconComponent = iconName
    ? LucideIcons[iconName as keyof typeof LucideIcons]
    : undefined;

  if (IconComponent) {
    // Create the icon element with the provided props
    return createElement(
      IconComponent as unknown as React.ComponentType,
      props
    );
  }

  // Return null if icon not found
  console.warn(`Icon '${iconName}' not found in Lucide Icons`);
  return null;
}
