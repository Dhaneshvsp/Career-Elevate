"use client";
import { templates } from "../_data/templates"; // Adjust path as needed
import { CheckCircle2 } from "lucide-react"; // Added for selection indicator

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Choose Your Resume Template
        </h2>
        <p className="mt-2 text-base text-gray-600 max-w-2xl mx-auto">
          Pick a template that reflects your unique professional style and aligns with your career
          aspirations.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {templates.map((template) => {
          const IconComponent = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              className={`relative group bg-white border rounded-xl shadow-sm cursor-pointer transition-all duration-300 ease-in-out ${
                isSelected
                  ? "border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]"
                  : "border-gray-200 hover:shadow-lg hover:border-indigo-300 hover:scale-[1.02]"
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              {/* Icon Container */}
              <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
                <IconComponent
                  className={`w-20 h-20 transition-colors duration-200 ${
                    isSelected ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-500"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" aria-label="Selected" />
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none ${
                  isSelected ? "opacity-5" : ""
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;