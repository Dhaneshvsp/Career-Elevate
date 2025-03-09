"use client"; // Only needed if imported into a server component
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "ai-resume-builder-data";

export const getInitialResumeData = () => ({
  id: uuidv4(),
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  selectedTemplate: "professional",
});

export const saveResumeData = (data) => {
  const updatedData = {
    ...data,
    lastSaved: new Date(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  }
};

export const loadResumeData = () => {
  if (typeof window === "undefined") return null; // Avoid SSR issues
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse resume data from localStorage", error);
    return null;
  }
};

export const clearResumeData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
};