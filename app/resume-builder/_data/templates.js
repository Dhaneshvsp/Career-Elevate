import { Briefcase, Paintbrush, AlignLeft } from "lucide-react";

export const templates = [
  {
    id: "professional",
    name: "Professional",
    icon: Briefcase, // Represents a corporate, business-like feel
    description: "A clean, professional template suitable for corporate environments.",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Paintbrush, // Represents creativity and design
    description: "A modern, creative template for design and creative roles.",
  },
  {
    id: "minimal",
    name: "Minimal",
    icon: AlignLeft, // Represents simplicity and readability
    description: "A minimalist template that focuses on content and readability.",
  },
];

// Default template ID
export const defaultTemplate = templates[0].id;