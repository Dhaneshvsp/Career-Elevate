"use client";
import React, { useState, useEffect } from "react";
import { suggestKeywords } from "../_data/keywords.js"; // Ensure correct path
import { Sparkles } from "lucide-react";

const KeywordOptimizer = ({ resumeData, updateResumeData }) => {
  const [industry, setIndustry] = useState("software");
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = () => {
    setIsAnalyzing(true);

    // Simulate async analysis with a timeout
    setTimeout(() => {
      const resumeText = [
        resumeData.summary || "",
        ...resumeData.workExperience.map(
          (exp) =>
            `${exp.position || ""} ${exp.company || ""} ${exp.description || ""} ${
              (exp.achievements || []).join(" ")
            }`
        ),
        ...resumeData.skills.map((skill) => skill.name || ""),
        ...resumeData.projects.map(
          (project) => `${project.name || ""} ${project.description || ""}`
        ),
      ].join(" ");

      const keywordSuggestions = suggestKeywords(resumeText, industry);

      const newSuggestions = keywordSuggestions.map((keyword) => ({
        original: "",
        suggestion: keyword,
        reason: `Adding "${keyword}" can improve visibility for ${industry} roles.`,
      }));

      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    if (resumeData) {
      analyzeResume();
    }
  }, [industry, resumeData]); // Added resumeData to trigger re-analysis if it changes

  const applyKeyword = (suggestion) => {
    updateResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: Date.now().toString(),
          name: suggestion.suggestion,
          level: 3, // Changed 'Beginner' to a numeric value to match typical skill schema
        },
      ],
    });

    setSuggestions(suggestions.filter((s) => s.suggestion !== suggestion.suggestion));
  };

  // Guard against undefined resumeData
  if (!resumeData) {
    return <div>Loading resume data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Keyword Optimizer</h2>
        <p className="text-gray-600 mt-2">
          Optimize your resume with industry-specific keywords to improve visibility to recruiters
          and ATS systems.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Industry
        </label>
        <select
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="software">Software Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
        </select>

        <button
          onClick={analyzeResume}
          disabled={isAnalyzing}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          {!isAnalyzing && <Sparkles className="ml-2 h-4 w-4" />}
        </button>
      </div>

      {isAnalyzing ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
          <p className="text-gray-600">Analyzing your resume...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Suggested Keyword:{" "}
                    <span className="text-indigo-600">{suggestion.suggestion}</span>
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">{suggestion.reason}</p>
                </div>
                <button
                  onClick={() => applyKeyword(suggestion)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Add to Skills
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">
            No suggestions available. Try changing the industry or click "Analyze Resume".
          </p>
        </div>
      )}
    </div>
  );
};

export default KeywordOptimizer;