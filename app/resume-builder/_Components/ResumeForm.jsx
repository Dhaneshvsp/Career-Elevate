"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  debounce,
  createEmptyWorkExperience,
  createEmptyEducation,
  createEmptySkill,
  createEmptyCertification,
  createEmptyProject,
} from "../_utils/helpers";
import { saveResumeData } from "../_utils/storage"; // Removed unused imports
import { Plus, Minus } from "lucide-react";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

const ResumeForm = ({ resumeData, updateResumeData }) => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Function to save resume to both database and localStorage
  const saveResume = async () => {
    if (!userEmail) return; // Skip save if no user email
    try {
      const existingResume = await db
        .select()
        .from(Resumes)
        .where(eq(Resumes.email, userEmail))
        .limit(1);

      if (existingResume.length > 0) {
        // Update existing record
        await db
          .update(Resumes)
          .set({ data: resumeData, lastSaved: new Date() })
          .where(eq(Resumes.email, userEmail));
      } else {
        // Insert new record
        await db.insert(Resumes).values({
          email: userEmail,
          data: resumeData,
        });
      }
      // Save to localStorage as well
      saveResumeData(resumeData);
      console.log("Resume saved successfully to database and localStorage.");
    } catch (error) {
      console.error("Error saving resume to database:", error);
      // Save to localStorage even if database fails
      saveResumeData(resumeData);
      console.log("Resume saved to localStorage as fallback.");
    }
  };

  // Auto-save every 30 seconds
  const debouncedSave = useCallback(debounce(saveResume, 30000), [resumeData, userEmail]);

  useEffect(() => {
    debouncedSave();
  }, [resumeData, debouncedSave]);

  // Save before leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveResume();
      event.returnValue = "Are you sure you want to leave? Changes will be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [resumeData, userEmail]);

  // Handle input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    updateResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSummaryChange = (e) => {
    updateResumeData({ summary: e.target.value });
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    updateResumeData({
      workExperience: [...resumeData.workExperience, createEmptyWorkExperience()],
    });
  };

  const updateWorkExperience = (index, field, value) => {
    const updatedExperiences = [...resumeData.workExperience];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    updateResumeData({ workExperience: updatedExperiences });
  };

  const removeWorkExperience = (index) => {
    const updatedExperiences = [...resumeData.workExperience];
    updatedExperiences.splice(index, 1);
    updateResumeData({ workExperience: updatedExperiences });
  };

  const addAchievement = (experienceIndex) => {
    const updatedExperiences = [...resumeData.workExperience];
    updatedExperiences[experienceIndex].achievements.push("");
    updateResumeData({ workExperience: updatedExperiences });
  };

  const updateAchievement = (experienceIndex, achievementIndex, value) => {
    const updatedExperiences = [...resumeData.workExperience];
    updatedExperiences[experienceIndex].achievements[achievementIndex] = value;
    updateResumeData({ workExperience: updatedExperiences });
  };

  const removeAchievement = (experienceIndex, achievementIndex) => {
    const updatedExperiences = [...resumeData.workExperience];
    updatedExperiences[experienceIndex].achievements.splice(achievementIndex, 1);
    updateResumeData({ workExperience: updatedExperiences });
  };

  // Education Handlers
  const addEducation = () => {
    updateResumeData({
      education: [...resumeData.education, createEmptyEducation()],
    });
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateResumeData({ education: updatedEducation });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    updateResumeData({ education: updatedEducation });
  };

  // Skills Handlers
  const addSkill = () => {
    updateResumeData({
      skills: [...resumeData.skills, createEmptySkill()],
    });
  };

  const updateSkill = (index, field, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === "level" ? parseInt(value, 10) : value,
    };
    updateResumeData({ skills: updatedSkills });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    updateResumeData({ skills: updatedSkills });
  };

  // Certifications Handlers
  const addCertification = () => {
    updateResumeData({
      certifications: [...resumeData.certifications, createEmptyCertification()],
    });
  };

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    updateResumeData({ certifications: updatedCertifications });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...resumeData.certifications];
    updatedCertifications.splice(index, 1);
    updateResumeData({ certifications: updatedCertifications });
  };

  // Projects Handlers
  const addProject = () => {
    updateResumeData({
      projects: [...resumeData.projects, createEmptyProject()],
    });
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    updateResumeData({ projects: updatedProjects });
  };

  const removeProject = (index) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects.splice(index, 1);
    updateResumeData({ projects: updatedProjects });
  };

  // Guard against undefined resumeData
  if (!resumeData || !resumeData.personalInfo) {
    return <div>Loading resume data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveSection("personalInfo")}
          className={`pb-2 px-1 ${
            activeSection === "personalInfo"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Personal Info
        </button>
        <button
          onClick={() => setActiveSection("summary")}
          className={`pb-2 px-1 ${
            activeSection === "summary"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveSection("workExperience")}
          className={`pb-2 px-1 ${
            activeSection === "workExperience"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setActiveSection("education")}
          className={`pb-2 px-1 ${
            activeSection === "education"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setActiveSection("skills")}
          className={`pb-2 px-1 ${
            activeSection === "skills"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveSection("certifications")}
          className={`pb-2 px-1 ${
            activeSection === "certifications"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Certifications
        </button>
        <button
          onClick={() => setActiveSection("projects")}
          className={`pb-2 px-1 ${
            activeSection === "projects"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Projects
        </button>
      </div>

      {/* Personal Info Section */}
      {activeSection === "personalInfo" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={resumeData.personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={resumeData.personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={resumeData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn (optional)
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={resumeData.personalInfo.linkedin || ""}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website (optional)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={resumeData.personalInfo.website || ""}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {activeSection === "summary" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
          <div>
            <textarea
              id="summary"
              name="summary"
              rows={6}
              value={resumeData.summary}
              onChange={handleSummaryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write a compelling summary of your professional background, skills, and career goals..."
            />
          </div>
        </div>
      )}

      {/* Work Experience Section */}
      {activeSection === "workExperience" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
            <button
              type="button"
              onClick={addWorkExperience}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Experience
            </button>
          </div>

          <div className="space-y-6">
            {resumeData.workExperience.map((experience, index) => (
              <div
                key={experience.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {experience.position || experience.company || `Experience ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateWorkExperience(index, "position", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-end space-x-4">
                    <div className={`flex-1 ${experience.current ? "opacity-50" : ""}`}>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
                        disabled={experience.current}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`current-job-${index}`}
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => updateWorkExperience(index, "current", e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-job-${index}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Current
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    value={experience.description}
                    onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Achievements
                    </label>
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) =>
                            updateAchievement(index, achievementIndex, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Describe a key achievement..."
                        />
                        <button
                          type="button"
                          onClick={() => removeAchievement(index, achievementIndex)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {activeSection === "education" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            <button
              type="button"
              onClick={addEducation}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </button>
          </div>

          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {edu.institution || edu.degree || `Education ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-end space-x-4">
                    <div className={`flex-1 ${edu.current ? "opacity-50" : ""}`}>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                        disabled={edu.current}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`current-edu-${index}`}
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => updateEducation(index, "current", e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-edu-${index}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Current
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={edu.description || ""}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe your studies, achievements, or relevant coursework..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div
                key={skill.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">
                    {skill.name || `Skill ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, "name", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proficiency Level (1-5)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, "level", e.target.value)}
                      className="mt-1 block w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {activeSection === "certifications" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
            <button
              type="button"
              onClick={addCertification}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Certification
            </button>
          </div>

          <div className="space-y-4">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {cert.name || `Certification ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Issued</label>
                    <input
                      type="date"
                      value={cert.date}
                      onChange={(e) => updateCertification(index, "date", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL (optional)
                    </label>
                    <input
                      type="url"
                      value={cert.url || ""}
                      onChange={(e) => updateCertification(index, "url", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://example.com/certification"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeSection === "projects" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
            <button
              type="button"
              onClick={addProject}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Project
            </button>
          </div>

          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {project.name || `Project ${index + 1}`}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, "name", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL (optional)
                    </label>
                    <input
                      type="url"
                      value={project.url || ""}
                      onChange={(e) => updateProject(index, "url", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://example.com/project"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, "startDate", e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-end space-x-4">
                    <div className={`flex-1 ${project.current ? "opacity-50" : ""}`}>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={project.endDate}
                        onChange={(e) => updateProject(index, "endDate", e.target.value)}
                        disabled={project.current}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id={`current-project-${index}`}
                        type="checkbox"
                        checked={project.current}
                        onChange={(e) => updateProject(index, "current", e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-project-${index}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Current
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Describe the project, your role, and key technologies used..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;




// Working module(with reduntant drizzle direct interaction)
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   debounce,
//   createEmptyWorkExperience,
//   createEmptyEducation,
//   createEmptySkill,
//   createEmptyCertification,
//   createEmptyProject,
// } from "../_utils/helpers";
// import {
//   getInitialResumeData,
//   saveResumeData,
//   loadResumeData,
// } from "../_utils/storage";
// import { Plus, Minus } from "lucide-react";
// import { db } from "@/utils/db";
// import { Resumes } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import { useUser } from "@clerk/nextjs";

// const ResumeForm = ({ resumeData, updateResumeData }) => {
//   const [activeSection, setActiveSection] = useState("personalInfo");
//   const {user} = useUser();
//   const userEmail = user?.primaryEmailAddress?.emailAddress; // Replace with dynamic user email (e.g., from auth)

//   // Fetch resume data on load (database first, then localStorage fallback)
//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const result = await db
//           .select()
//           .from(Resumes)
//           .where(eq(Resumes.email, userEmail))
//           .limit(1);

//         if (result.length > 0 && result[0].data) {
//           // Use database data if available
//           updateResumeData(result[0].data);
//         } else {
//           // Fallback to localStorage if no database data
//           const localData = loadResumeData();
//           if (localData) {
//             updateResumeData(localData);
//           } else {
//             // If neither exists, initialize with default data
//             updateResumeData(getInitialResumeData());
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching resume from database:", error);
//         // On database error, try localStorage
//         const localData = loadResumeData();
//         if (localData) {
//           updateResumeData(localData);
//         } else {
//           updateResumeData(getInitialResumeData());
//         }
//       }
//     };
//     fetchResume();
//   }, [userEmail, updateResumeData]);

//   // Function to save resume to both database and localStorage
//   const saveResume = async () => {
//     try {
//       const existingResume = await db
//         .select()
//         .from(Resumes)
//         .where(eq(Resumes.email, userEmail))
//         .limit(1);

//       if (existingResume.length > 0) {
//         // Update existing record
//         await db
//           .update(Resumes)
//           .set({ data: resumeData })
//           .where(eq(Resumes.email, userEmail));
//       } else {
//         // Insert new record
//         await db.insert(Resumes).values({
//           email: userEmail,
//           data: resumeData,
//         });
//       }
//       // Save to localStorage as well
//       saveResumeData(resumeData);
//       console.log("Resume saved successfully to database and localStorage.");
//     } catch (error) {
//       console.error("Error saving resume to database:", error);
//       // Save to localStorage even if database fails
//       saveResumeData(resumeData);
//       console.log("Resume saved to localStorage as fallback.");
//     }
//   };

//   // Auto-save every 30 seconds
//   const debouncedSave = useCallback(
//     debounce(() => {
//       saveResume();
//     }, 30000),
//     [resumeData]
//   );

//   useEffect(() => {
//     debouncedSave();
//   }, [resumeData, debouncedSave]);

//   // Save before leaving the page
//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       saveResume();
//       event.returnValue = "Are you sure you want to leave? Changes will be saved.";
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [resumeData]);

//   // Handle input changes
//   const handlePersonalInfoChange = (e) => {
//     const { name, value } = e.target;
//     updateResumeData({
//       personalInfo: {
//         ...resumeData.personalInfo,
//         [name]: value,
//       },
//     });
//   };

//   const handleSummaryChange = (e) => {
//     updateResumeData({ summary: e.target.value });
//   };

//   // Work Experience Handlers
//   const addWorkExperience = () => {
//     updateResumeData({
//       workExperience: [...resumeData.workExperience, createEmptyWorkExperience()],
//     });
//   };

//   const updateWorkExperience = (index, field, value) => {
//     const updatedExperiences = [...resumeData.workExperience];
//     updatedExperiences[index] = {
//       ...updatedExperiences[index],
//       [field]: value,
//     };
//     updateResumeData({ workExperience: updatedExperiences });
//   };

//   const removeWorkExperience = (index) => {
//     const updatedExperiences = [...resumeData.workExperience];
//     updatedExperiences.splice(index, 1);
//     updateResumeData({ workExperience: updatedExperiences });
//   };

//   const addAchievement = (experienceIndex) => {
//     const updatedExperiences = [...resumeData.workExperience];
//     updatedExperiences[experienceIndex].achievements.push("");
//     updateResumeData({ workExperience: updatedExperiences });
//   };

//   const updateAchievement = (experienceIndex, achievementIndex, value) => {
//     const updatedExperiences = [...resumeData.workExperience];
//     updatedExperiences[experienceIndex].achievements[achievementIndex] = value;
//     updateResumeData({ workExperience: updatedExperiences });
//   };

//   const removeAchievement = (experienceIndex, achievementIndex) => {
//     const updatedExperiences = [...resumeData.workExperience];
//     updatedExperiences[experienceIndex].achievements.splice(achievementIndex, 1);
//     updateResumeData({ workExperience: updatedExperiences });
//   };

//   // Education Handlers
//   const addEducation = () => {
//     updateResumeData({
//       education: [...resumeData.education, createEmptyEducation()],
//     });
//   };

//   const updateEducation = (index, field, value) => {
//     const updatedEducation = [...resumeData.education];
//     updatedEducation[index] = {
//       ...updatedEducation[index],
//       [field]: value,
//     };
//     updateResumeData({ education: updatedEducation });
//   };

//   const removeEducation = (index) => {
//     const updatedEducation = [...resumeData.education];
//     updatedEducation.splice(index, 1);
//     updateResumeData({ education: updatedEducation });
//   };

//   // Skills Handlers
//   const addSkill = () => {
//     updateResumeData({
//       skills: [...resumeData.skills, createEmptySkill()],
//     });
//   };

//   const updateSkill = (index, field, value) => {
//     const updatedSkills = [...resumeData.skills];
//     updatedSkills[index] = {
//       ...updatedSkills[index],
//       [field]: field === "level" ? parseInt(value, 10) : value,
//     };
//     updateResumeData({ skills: updatedSkills });
//   };

//   const removeSkill = (index) => {
//     const updatedSkills = [...resumeData.skills];
//     updatedSkills.splice(index, 1);
//     updateResumeData({ skills: updatedSkills });
//   };

//   // Certifications Handlers
//   const addCertification = () => {
//     updateResumeData({
//       certifications: [...resumeData.certifications, createEmptyCertification()],
//     });
//   };

//   const updateCertification = (index, field, value) => {
//     const updatedCertifications = [...resumeData.certifications];
//     updatedCertifications[index] = {
//       ...updatedCertifications[index],
//       [field]: value,
//     };
//     updateResumeData({ certifications: updatedCertifications });
//   };

//   const removeCertification = (index) => {
//     const updatedCertifications = [...resumeData.certifications];
//     updatedCertifications.splice(index, 1);
//     updateResumeData({ certifications: updatedCertifications });
//   };

//   // Projects Handlers
//   const addProject = () => {
//     updateResumeData({
//       projects: [...resumeData.projects, createEmptyProject()],
//     });
//   };

//   const updateProject = (index, field, value) => {
//     const updatedProjects = [...resumeData.projects];
//     updatedProjects[index] = {
//       ...updatedProjects[index],
//       [field]: value,
//     };
//     updateResumeData({ projects: updatedProjects });
//   };

//   const removeProject = (index) => {
//     const updatedProjects = [...resumeData.projects];
//     updatedProjects.splice(index, 1);
//     updateResumeData({ projects: updatedProjects });
//   };
// //added to manage firstName
// if (!resumeData || !resumeData.personalInfo) {
//     return <div>Loading resume data...</div>;
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex space-x-4 border-b border-gray-200 mb-6">
//         <button
//           onClick={() => setActiveSection("personalInfo")}
//           className={`pb-2 px-1 ${
//             activeSection === "personalInfo"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Personal Info
//         </button>
//         <button
//           onClick={() => setActiveSection("summary")}
//           className={`pb-2 px-1 ${
//             activeSection === "summary"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Summary
//         </button>
//         <button
//           onClick={() => setActiveSection("workExperience")}
//           className={`pb-2 px-1 ${
//             activeSection === "workExperience"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Work Experience
//         </button>
//         <button
//           onClick={() => setActiveSection("education")}
//           className={`pb-2 px-1 ${
//             activeSection === "education"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Education
//         </button>
//         <button
//           onClick={() => setActiveSection("skills")}
//           className={`pb-2 px-1 ${
//             activeSection === "skills"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Skills
//         </button>
//         <button
//           onClick={() => setActiveSection("certifications")}
//           className={`pb-2 px-1 ${
//             activeSection === "certifications"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Certifications
//         </button>
//         <button
//           onClick={() => setActiveSection("projects")}
//           className={`pb-2 px-1 ${
//             activeSection === "projects"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Projects
//         </button>
//       </div>

//       {/* Personal Info Section */}
//       {activeSection === "personalInfo" && (
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={resumeData.personalInfo.firstName}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={resumeData.personalInfo.lastName}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={resumeData.personalInfo.email}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={resumeData.personalInfo.phone}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={resumeData.personalInfo.address}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
//                 LinkedIn (optional)
//               </label>
//               <input
//                 type="url"
//                 id="linkedin"
//                 name="linkedin"
//                 value={resumeData.personalInfo.linkedin || ""}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div>
//               <label htmlFor="website" className="block text-sm font-medium text-gray-700">
//                 Website (optional)
//               </label>
//               <input
//                 type="url"
//                 id="website"
//                 name="website"
//                 value={resumeData.personalInfo.website || ""}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Summary Section */}
//       {activeSection === "summary" && (
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
//           <div>
//             <textarea
//               id="summary"
//               name="summary"
//               rows={6}
//               value={resumeData.summary}
//               onChange={handleSummaryChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Write a compelling summary of your professional background, skills, and career goals..."
//             />
//           </div>
//         </div>
//       )}

//       {/* Work Experience Section */}
//       {activeSection === "workExperience" && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
//             <button
//               type="button"
//               onClick={addWorkExperience}
//               className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Experience
//             </button>
//           </div>

//           <div className="space-y-6">
//             {resumeData.workExperience.map((experience, index) => (
//               <div
//                 key={experience.id}
//                 className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {experience.position || experience.company || `Experience ${index + 1}`}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeWorkExperience(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Company</label>
//                     <input
//                       type="text"
//                       value={experience.company}
//                       onChange={(e) => updateWorkExperience(index, "company", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Position</label>
//                     <input
//                       type="text"
//                       value={experience.position}
//                       onChange={(e) => updateWorkExperience(index, "position", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                     <input
//                       type="date"
//                       value={experience.startDate}
//                       onChange={(e) => updateWorkExperience(index, "startDate", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-4">
//                     <div className={`flex-1 ${experience.current ? "opacity-50" : ""}`}>
//                       <label className="block text-sm font-medium text-gray-700">End Date</label>
//                       <input
//                         type="date"
//                         value={experience.endDate}
//                         onChange={(e) => updateWorkExperience(index, "endDate", e.target.value)}
//                         disabled={experience.current}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         id={`current-job-${index}`}
//                         type="checkbox"
//                         checked={experience.current}
//                         onChange={(e) => updateWorkExperience(index, "current", e.target.checked)}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                       />
//                       <label
//                         htmlFor={`current-job-${index}`}
//                         className="ml-2 block text-sm text-gray-700"
//                       >
//                         Current
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     rows={3}
//                     value={experience.description}
//                     onChange={(e) => updateWorkExperience(index, "description", e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Key Achievements
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => addAchievement(index)}
//                       className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
//                     >
//                       <Plus className="h-3 w-3 mr-1" /> Add
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {experience.achievements.map((achievement, achievementIndex) => (
//                       <div key={achievementIndex} className="flex items-center">
//                         <input
//                           type="text"
//                           value={achievement}
//                           onChange={(e) =>
//                             updateAchievement(index, achievementIndex, e.target.value)
//                           }
//                           className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                           placeholder="Describe a key achievement..."
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeAchievement(index, achievementIndex)}
//                           className="ml-2 text-red-600 hover:text-red-800"
//                         >
//                           <Minus className="h-5 w-5" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Education Section */}
//       {activeSection === "education" && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Education</h2>
//             <button
//               type="button"
//               onClick={addEducation}
//               className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Education
//             </button>
//           </div>

//           <div className="space-y-6">
//             {resumeData.education.map((edu, index) => (
//               <div
//                 key={edu.id}
//                 className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {edu.institution || edu.degree || `Education ${index + 1}`}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeEducation(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Institution</label>
//                     <input
//                       type="text"
//                       value={edu.institution}
//                       onChange={(e) => updateEducation(index, "institution", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Degree</label>
//                     <input
//                       type="text"
//                       value={edu.degree}
//                       onChange={(e) => updateEducation(index, "degree", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Field of Study
//                     </label>
//                     <input
//                       type="text"
//                       value={edu.field}
//                       onChange={(e) => updateEducation(index, "field", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                     <input
//                       type="date"
//                       value={edu.startDate}
//                       onChange={(e) => updateEducation(index, "startDate", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-4">
//                     <div className={`flex-1 ${edu.current ? "opacity-50" : ""}`}>
//                       <label className="block text-sm font-medium text-gray-700">End Date</label>
//                       <input
//                         type="date"
//                         value={edu.endDate}
//                         onChange={(e) => updateEducation(index, "endDate", e.target.value)}
//                         disabled={edu.current}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         id={`current-edu-${index}`}
//                         type="checkbox"
//                         checked={edu.current}
//                         onChange={(e) => updateEducation(index, "current", e.target.checked)}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                       />
//                       <label
//                         htmlFor={`current-edu-${index}`}
//                         className="ml-2 block text-sm text-gray-700"
//                       >
//                         Current
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Description (optional)
//                   </label>
//                   <textarea
//                     rows={3}
//                     value={edu.description || ""}
//                     onChange={(e) => updateEducation(index, "description", e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Describe your studies, achievements, or relevant coursework..."
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Skills Section */}
//       {activeSection === "skills" && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
//             <button
//               type="button"
//               onClick={addSkill}
//               className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Skill
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {resumeData.skills.map((skill, index) => (
//               <div
//                 key={skill.id}
//                 className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-medium text-gray-900">
//                     {skill.name || `Skill ${index + 1}`}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeSkill(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Skill Name</label>
//                     <input
//                       type="text"
//                       value={skill.name}
//                       onChange={(e) => updateSkill(index, "name", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Proficiency Level (1-5)
//                     </label>
//                     <input
//                       type="range"
//                       min="1"
//                       max="5"
//                       value={skill.level}
//                       onChange={(e) => updateSkill(index, "level", e.target.value)}
//                       className="mt-1 block w-full"
//                     />
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Beginner</span>
//                       <span>Intermediate</span>
//                       <span>Expert</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Certifications Section */}
//       {activeSection === "certifications" && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
//             <button
//               type="button"
//               onClick={addCertification}
//               className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Certification
//             </button>
//           </div>

//           <div className="space-y-4">
//             {resumeData.certifications.map((cert, index) => (
//               <div
//                 key={cert.id}
//                 className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {cert.name || `Certification ${index + 1}`}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeCertification(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Certification Name
//                     </label>
//                     <input
//                       type="text"
//                       value={cert.name}
//                       onChange={(e) => updateCertification(index, "name", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Issuing Organization
//                     </label>
//                     <input
//                       type="text"
//                       value={cert.issuer}
//                       onChange={(e) => updateCertification(index, "issuer", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Date Issued</label>
//                     <input
//                       type="date"
//                       value={cert.date}
//                       onChange={(e) => updateCertification(index, "date", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       URL (optional)
//                     </label>
//                     <input
//                       type="url"
//                       value={cert.url || ""}
//                       onChange={(e) => updateCertification(index, "url", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       placeholder="https://example.com/certification"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Projects Section */}
//       {activeSection === "projects" && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
//             <button
//               type="button"
//               onClick={addProject}
//               className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Project
//             </button>
//           </div>

//           <div className="space-y-6">
//             {resumeData.projects.map((project, index) => (
//               <div
//                 key={project.id}
//                 className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {project.name || `Project ${index + 1}`}
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={() => removeProject(index)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Minus className="h-5 w-5" />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Project Name</label>
//                     <input
//                       type="text"
//                       value={project.name}
//                       onChange={(e) => updateProject(index, "name", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       URL (optional)
//                     </label>
//                     <input
//                       type="url"
//                       value={project.url || ""}
//                       onChange={(e) => updateProject(index, "url", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       placeholder="https://example.com/project"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                     <input
//                       type="date"
//                       value={project.startDate}
//                       onChange={(e) => updateProject(index, "startDate", e.target.value)}
//                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                   <div className="flex items-end space-x-4">
//                     <div className={`flex-1 ${project.current ? "opacity-50" : ""}`}>
//                       <label className="block text-sm font-medium text-gray-700">End Date</label>
//                       <input
//                         type="date"
//                         value={project.endDate}
//                         onChange={(e) => updateProject(index, "endDate", e.target.value)}
//                         disabled={project.current}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         id={`current-project-${index}`}
//                         type="checkbox"
//                         checked={project.current}
//                         onChange={(e) => updateProject(index, "current", e.target.checked)}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                       />
//                       <label
//                         htmlFor={`current-project-${index}`}
//                         className="ml-2 block text-sm text-gray-700"
//                       >
//                         Current
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     rows={3}
//                     value={project.description}
//                     onChange={(e) => updateProject(index, "description", e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Describe the project, your role, and key technologies used..."
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeForm;



//use it whenever we have firstName undefined error
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   debounce,
//   createEmptyWorkExperience,
//   createEmptyEducation,
//   createEmptySkill,
//   createEmptyCertification,
//   createEmptyProject,
// } from "../_utils/helpers";
// import {
//   getInitialResumeData,
//   saveResumeData,
//   loadResumeData,
// } from "../_utils/storage";
// import { Plus, Minus } from "lucide-react";
// import { db } from "@/utils/db";
// import { Resumes } from "@/utils/schema";
// import { eq } from "drizzle-orm";

// const ResumeForm = ({ resumeData, updateResumeData }) => {
//   const [activeSection, setActiveSection] = useState("personalInfo");
//   const userEmail = "user@example.com"; // Replace with dynamic user email (e.g., from auth)

//   // Fetch resume data on load (database first, then localStorage fallback)
//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const result = await db
//           .select()
//           .from(Resumes)
//           .where(eq(Resumes.email, userEmail))
//           .limit(1);

//         if (result.length > 0 && result[0].data) {
//           updateResumeData(result[0].data);
//         } else {
//           const localData = loadResumeData();
//           if (localData) {
//             updateResumeData(localData);
//           } else {
//             updateResumeData(getInitialResumeData());
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching resume from database:", error);
//         const localData = loadResumeData();
//         if (localData) {
//           updateResumeData(localData);
//         } else {
//           updateResumeData(getInitialResumeData());
//         }
//       }
//     };
//     fetchResume();
//   }, [userEmail, updateResumeData]);

//   // Save resume logic (unchanged for brevity)
//   const saveResume = async () => {
//     try {
//       const existingResume = await db
//         .select()
//         .from(Resumes)
//         .where(eq(Resumes.email, userEmail))
//         .limit(1);

//       if (existingResume.length > 0) {
//         await db
//           .update(Resumes)
//           .set({ data: resumeData })
//           .where(eq(Resumes.email, userEmail));
//       } else {
//         await db.insert(Resumes).values({
//           email: userEmail,
//           data: resumeData,
//         });
//       }
//       saveResumeData(resumeData);
//       console.log("Resume saved successfully to database and localStorage.");
//     } catch (error) {
//       console.error("Error saving resume to database:", error);
//       saveResumeData(resumeData);
//       console.log("Resume saved to localStorage as fallback.");
//     }
//   };

//   const debouncedSave = useCallback(debounce(saveResume, 30000), [resumeData]);

//   useEffect(() => {
//     debouncedSave();
//   }, [resumeData, debouncedSave]);

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       saveResume();
//       event.returnValue = "Are you sure you want to leave? Changes will be saved.";
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [resumeData]);

//   // Handlers (unchanged for brevity)
//   const handlePersonalInfoChange = (e) => {
//     const { name, value } = e.target;
//     updateResumeData({
//       personalInfo: {
//         ...resumeData.personalInfo,
//         [name]: value,
//       },
//     });
//   };

//   // ... (other handlers remain the same)

//   // Guard against undefined resumeData
//   if (!resumeData || !resumeData.personalInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="space-y-8">
//       {/* Tabs and sections remain the same */}
//       <div className="flex space-x-4 border-b border-gray-200 mb-6">
//         <button
//           onClick={() => setActiveSection("personalInfo")}
//           className={`pb-2 px-1 ${
//             activeSection === "personalInfo"
//               ? "border-b-2 border-indigo-500 text-indigo-600"
//               : "text-gray-500"
//           }`}
//         >
//           Personal Info
//         </button>
//         {/* ... other tabs ... */}
//       </div>

//       {activeSection === "personalInfo" && (
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={resumeData.personalInfo.firstName}
//                 onChange={handlePersonalInfoChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             {/* ... other inputs ... */}
//           </div>
//         </div>
//       )}
//       {/* ... other sections ... */}
//     </div>
//   );
// };

// export default ResumeForm;