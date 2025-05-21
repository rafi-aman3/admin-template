# Configuration System

This directory contains configuration files that allow you to customize the admin template without modifying the source code.

## Available Configuration

### Site Configuration (`site.ts`)

The `site.ts` file contains settings for:

- **Site Metadata**: Name and description of your application
- **Branding**: Logo icon and text
- **UI Customization**: Theme settings
- **Assets**: Image paths and other assets
  - `authBackground`: The background image used on login/home pages
  - Add more images as needed
- **Links**: Navigation links throughout the application

## How to Use

1. Open the configuration file you want to modify (e.g., `site.ts`)
2. Update the values according to your preferences
3. Save the file
4. Restart the development server if it's running

### Example: Changing the Background Image

To change the background image on the login/home pages:

1. Add your image to the `public/` directory
2. Open `config/site.ts`
3. Update the `authBackground` path:

```typescript
assets: {
  images: {
    authBackground: "/your-image.jpg", // Update this path
    // ...
  },
},
```

### Example: Changing the Brand Name

To change the brand name displayed throughout the application:

1. Open `config/site.ts`
2. Update the `name` and `logo.text` values:

```typescript
name: "Your Company Name",
// ...
logo: {
  icon: "GalleryVerticalEnd", // You can also change the icon if needed
  text: "Your Company Name",
},
```

## Adding New Configuration Options

When adding new customizable elements to the application, follow these steps:

1. Add the new configuration option to the appropriate config file
2. Import the config in the component where it's needed
3. Use the configuration value instead of hardcoded values

This ensures that all customizable elements can be modified through the configuration system.
