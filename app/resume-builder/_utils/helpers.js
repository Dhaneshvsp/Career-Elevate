"use client"; // Only needed if this becomes a standalone module imported into a server component
import { v4 as uuidv4 } from "uuid";

// Function to create an empty Work Experience object
export const createEmptyWorkExperience = () => ({
  id: uuidv4(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  achievements: [],
});

// Function to create an empty Education object
export const createEmptyEducation = () => ({
  id: uuidv4(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
});

// Function to create an empty Skill object
export const createEmptySkill = () => ({
  id: uuidv4(),
  name: "",
  level: "", // Consider defaulting to 1 if you want a numeric value
});

// Function to create an empty Certification object
export const createEmptyCertification = () => ({
  id: uuidv4(),
  name: "",
  issuer: "",
  date: "",
  url: "",
});

// Function to create an empty Project object
export const createEmptyProject = () => ({
  id: uuidv4(),
  name: "",
  description: "",
  url: "",
  startDate: "",
  endDate: "",
  current: false,
});

// Function to format dates in 'MMM YYYY' format
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

// Debounce function to delay execution
export const debounce = (func, waitFor) => {
  let timeout = null;

  return (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};