/**
 * Theme configuration file
 *
 * This file contains theme-related settings that can be customized
 * to change the appearance of the application.
 */

export const themeConfig = {
  // Color scheme preferences
  colorScheme: {
    // Default color mode ("light" or "dark")
    defaultMode: "light",
    // Allow users to toggle between light and dark mode
    allowToggle: true,
  },

  // Custom colors (can be used to override the default color palette)
  colors: {
    // Primary brand color
    primary: {
      // Default values are used from the CSS variables defined in the project
      // Uncomment and modify these values to override the defaults
      // light: "#0070f3",
      // dark: "#3291ff",
    },
    // Add more custom colors as needed
  },

  // Typography settings
  typography: {
    // Font family
    fontFamily: {
      // Default font family (system font stack is used by default)
      default:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      // Monospace font for code blocks
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    // Font sizes
    fontSize: {
      // Base font size in pixels
      base: 16,
    },
  },

  // Layout settings
  layout: {
    // Maximum content width
    maxWidth: "1200px",
    // Container padding
    containerPadding: {
      mobile: "1rem",
      desktop: "2rem",
    },
  },

  // Animation settings
  animation: {
    // Default transition duration in milliseconds
    transitionDuration: 200,
    // Default transition timing function
    transitionTimingFunction: "ease-in-out",
  },
};
