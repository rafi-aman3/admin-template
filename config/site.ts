/**
 * Site configuration file
 *
 * This file contains all the customizable settings for the admin template.
 * Users can modify these settings to personalize the application without changing the code.
 */

export const siteConfig = {
  // Site metadata
  name: "XYZ",
  description: "Admin dashboard template",

  // Branding
  logo: {
    image: "https://placehold.co/400", // Path to logo image
    text: "XYZ",
  },

  // UI customization
  ui: {
    // Theme colors can be customized here if needed
    theme: {
      // Add custom theme settings if needed
    },
  },

  // Assets
  assets: {
    // Images
    images: {
      // Login/home page background image
      authBackground: "https://placehold.co/400",
      // Add more images as needed
      favicon: "/favicon.ico",
    },

    // Other assets
    icons: {
      // Add custom icons if needed
    },
  },

  // Links
  links: {
    // Main navigation links
    home: "/",
    dashboard: "/dashboard",
    login: "/login",
    // Add more links as needed
  },
};
