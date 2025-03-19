module.exports = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york", // Defines the component style
    rsc: true, // Enables React Server Components
    tsx: false, // Set to false since we are using JavaScript, not TypeScript
    tailwind: {
      config: "tailwind.config.js", // Ensure this matches your Tailwind config file
      css: "app/globals.css", // Your global Tailwind CSS file
      baseColor: "zinc", // Default color scheme
      cssVariables: true, // Enables CSS variables for theme customization
      prefix: "", // No prefix for Tailwind classes
    },
    aliases: {
      components: "@/components", // Main components directory
      ui: "@/components/ui", // UI components (ShadCN)
      utils: "@/utils", // Utility functions
      lib: "@/lib", // Library functions
      hooks: "@/hooks", // Custom React hooks
    },
    iconLibrary: "lucide", // Icon library (compatible with both ShadCN and Radix UI)
  };
  