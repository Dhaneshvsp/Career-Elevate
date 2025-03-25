// // app/resume-builder/_Components/ResumeBuilder.jsx
// "use client";
// import { useState, useEffect } from "react";
// import { Save, Trash2 } from "lucide-react";
// import TemplateSelector from "./TemplateSelector";
// import ResumeForm from "./ResumeForm";
// import ResumePreview from "./ResumePreview";
// import KeywordOptimizer from "./KeywordOptimizer";
// import { getInitialResumeData } from "../_utils/storage";

// export default function ResumeBuilder() {
//   const [resumeData, setResumeData] = useState(getInitialResumeData());
//   const [activeTab, setActiveTab] = useState("form");
//   const [isSaving, setIsSaving] = useState(false);
//   const [lastSaved, setLastSaved] = useState(null);

//   useEffect(() => {
//     async function fetchResume() {
//       try {
//         const response = await fetch("/api/resumes");
//         const data = await response.json();
//         if (data.length > 0) {
//           // Merge fetched data with defaults to ensure all fields exist
//           setResumeData((prev) => ({ ...getInitialResumeData(), ...data[0] }));
//         }
//       } catch (error) {
//         console.error("Error fetching resume:", error);
//       }
//     }
//     fetchResume();
//   }, []);

//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       await fetch("/api/resumes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(resumeData),
//       });
//       setLastSaved(new Date());
//     } catch (error) {
//       console.error("Error saving resume:", error);
//     }
//     setIsSaving(false);
//   };

//   const handleReset = () => {
//     if (window.confirm("Are you sure you want to reset your resume? This action cannot be undone.")) {
//       setResumeData(getInitialResumeData()); // Reset to full default structure
//     }
//   };

//   const updateResumeData = (newData) => {
//     setResumeData((prevData) => ({ ...prevData, ...newData }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm-6 lg-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md"
//             >
//               {isSaving ? "Saving..." : "Save"} <Save className="ml-2 h-4 w-4" />
//             </button>
//             <button
//               onClick={handleReset}
//               className="px-4 py-2 text-sm bg-white text-gray-700 border rounded-md"
//             >
//               Reset <Trash2 className="ml-2 h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm-6 lg-8 py-8">
//         {lastSaved && (
//           <div className="text-sm text-gray-500 mb-4">
//             Last saved: {lastSaved.toLocaleTimeString()}
//           </div>
//         )}

//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="border-b border-gray-200 flex">
//             <button
//               onClick={() => setActiveTab("form")}
//               className={`py-4 px-6 ${
//                 activeTab === "form"
//                   ? "text-indigo-600 border-b-2 border-indigo-500"
//                   : "text-gray-500"
//               }`}
//             >
//               Edit Resume
//             </button>
//             <button
//               onClick={() => setActiveTab("templates")}
//               className={`py-4 px-6 ${
//                 activeTab === "templates"
//                   ? "text-indigo-600 border-b-2 border-indigo-500"
//                   : "text-gray-500"
//               }`}
//             >
//               Templates
//             </button>
//             <button
//               onClick={() => setActiveTab("optimize")}
//               className={`py-4 px-6 ${
//                 activeTab === "optimize"
//                   ? "text-indigo-600 border-b-2 border-indigo-500"
//                   : "text-gray-500"
//               }`}
//             >
//               Optimize
//             </button>
//             <button
//               onClick={() => setActiveTab("preview")}
//               className={`py-4 px-6 ${
//                 activeTab === "preview"
//                   ? "text-indigo-600 border-b-2 border-indigo-500"
//                   : "text-gray-500"
//               }`}
//             >
//               Preview
//             </button>
//           </div>

//           <div className="p-6">
//             {activeTab === "form" && (
//               <ResumeForm resumeData={resumeData} updateResumeData={updateResumeData} />
//             )}
//             {activeTab === "templates" && (
//               <TemplateSelector
//                 selectedTemplate={resumeData.selectedTemplate}
//                 onSelectTemplate={(templateId) =>
//                   updateResumeData({ selectedTemplate: templateId })
//                 }
//               />
//             )}
//             {activeTab === "optimize" && (
//               <KeywordOptimizer resumeData={resumeData} updateResumeData={updateResumeData} />
//             )}
//             {activeTab === "preview" && <ResumePreview resumeData={resumeData} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//resume-builder/_Components/ResumeBuilder.jsx:
"use client";
import { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import TemplateSelector from "./TemplateSelector";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import KeywordOptimizer from "./KeywordOptimizer";
import { getInitialResumeData } from "../_utils/storage";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import PostHeader from "@/app/homepage/_components/PostHeader";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(getInitialResumeData());
  const [activeTab, setActiveTab] = useState("form");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const {user} = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress; // Replace with your email or auth logic

  // Load resume when the app starts
  useEffect(() => {
    async function loadResume() {
      try {
        const result = await db
          .select()
          .from(Resumes)
          .where(eq(Resumes.email, userEmail))
          .limit(1);
        if (result.length > 0 && result[0].data) {
          setResumeData({ ...getInitialResumeData(), ...result[0].data });
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      }
    }
    loadResume();
  }, [userEmail]);

  // Save resume to database
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const existingResume = await db
        .select()
        .from(Resumes)
        .where(eq(Resumes.email, userEmail))
        .limit(1);

      if (existingResume.length > 0) {
        await db
          .update(Resumes)
          .set({ data: resumeData, lastSaved: new Date() })
          .where(eq(Resumes.email, userEmail));
      } else {
        await db.insert(Resumes).values({
          email: userEmail,
          data: resumeData,
        });
      }
      setLastSaved(new Date());
    } catch (error) {
      console.error("Error saving resume:", error);
    }
    setIsSaving(false);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset?")) {
      setResumeData(getInitialResumeData());
    }
  };

  const updateResumeData = (newData) => {
    setResumeData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <PostHeader/>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end items-center">
          {/* <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1> */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md"
            >
              {isSaving ? "Saving..." : "Save"} <Save className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm bg-white text-gray-700 border rounded-md"
            >
              Reset <Trash2 className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {lastSaved && (
          <div className="text-sm text-gray-500 mb-4">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        )}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 flex">
            <button
              onClick={() => setActiveTab("form")}
              className={`py-4 px-6 ${activeTab === "form" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"}`}
            >
              Edit Resume
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-4 px-6 ${activeTab === "preview" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`py-4 px-6 ${activeTab === "templates" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"}`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab("optimize")}
              className={`py-4 px-6 ${activeTab === "optimize" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"}`}
            >
              Optimize
            </button>
          </div>
          <div className="p-6">
            {activeTab === "form" && (
              <ResumeForm resumeData={resumeData} updateResumeData={updateResumeData} />
            )}
            {activeTab === "preview" && (
              <ResumePreview resumeData={resumeData} updateResumeData={updateResumeData} />
            )}
             {activeTab === 'templates' && <TemplateSelector selectedTemplate={resumeData.selectedTemplate} onSelectTemplate={(templateId) => updateResumeData({ selectedTemplate: templateId })} />}
             {activeTab === 'optimize' && <KeywordOptimizer resumeData={resumeData} updateResumeData={updateResumeData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
