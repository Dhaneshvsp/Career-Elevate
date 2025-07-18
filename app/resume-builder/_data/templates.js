// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_data/templates.js
import { Briefcase, Paintbrush, AlignLeft, Layout, Clock, Shapes, Image} from "lucide-react";

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
  {
    id: "minimalist",
    name: "Minimalist Monochrome",
    icon: Layout, // Represents clean, structured design
    description: "A sleek, single-column template with a monochromatic palette, perfect for tech and corporate roles emphasizing clarity and elegance."
  },
  {
    id: "bold-geometric",
    name: "Bold Geometric",
    icon: Shapes, // Represents vibrant, geometric creativity
    description: "A vibrant, grid-based template with geometric accents, ideal for designers and creatives looking to stand out."
  },
  {
    id: "timeline-centric",
    name: "Timeline-Centric",
    icon: Clock, // Represents chronological, narrative flow
    description: "A narrative-driven template with a central timeline, great for showcasing career progression in engineering or project-based roles."
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    icon: Briefcase,
    description: 'A traditional two-column template with a professional black-and-gray theme, ideal for corporate or technical roles.',
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    icon: Image,
    description: 'A visually focused single-column template, suitable for creative or project-heavy roles with a clean design.',
  }
];

// Default template ID
export const defaultTemplate = templates[0].id;