// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/resume-builder/_Components/ResumePreview.jsx

//resume-builder/_Components/ResumePreview.jsx:
"use client";
import React, { useState, useRef } from "react";
import { Download, Printer } from "lucide-react";
import ProfessionalTemplate from "../_templates/ProfessionalTemplate";
import CreativeTemplate from "../_templates/CreativeTemplate";
import MinimalTemplate from "../_templates/MinimalTemplate";
import MinimalistTemplate from "../_templates/MinimalistTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import GeometricTemplate from "../_templates/GeometricTemplate";
import TimelineTemplate from "../_templates/TimelineTemplate";
import CorporateTemplate from "../_templates/CorporateTemplate";
import PortfolioTemplate from "../_templates/PortfolioTemplate";

const ResumePreview = ({ resumeData }) => {
  const [scale, setScale] = useState(1);
  const resumeRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
    }
  };

  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "professional":
        return <ProfessionalTemplate resumeData={resumeData} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />;
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate resumeData={resumeData}/>;
      case "bold-geometric":
        return <GeometricTemplate resumeData={resumeData}/>;
      case "timeline-centric":
        return <TimelineTemplate resumeData={resumeData}/>;
      case "corporate-classic":
        return <CorporateTemplate resumeData={resumeData}/>;
      case "portfolio-showcase":
        return <PortfolioTemplate resumeData={resumeData}/>
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Resume Preview</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="scale" className="text-sm text-gray-600">Zoom:</label>
            <input
              id="scale"
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-600">{Math.round(scale * 100)}%</span>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Printer className="h-4 w-4 mr-1" /> Print
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-1" /> Download PDF
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg flex justify-center overflow-auto">
        <div
          ref={resumeRef}
          className="bg-white shadow-lg"
          style={{
            width: "8.5in",
            minHeight: "11in",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            padding: "20px",
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;