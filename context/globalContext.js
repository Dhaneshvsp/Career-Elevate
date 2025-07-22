"use client";
import React, { createContext, useState, useContext } from "react";
import useCategories from "./useCategories";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children, initialCategories }) => {
  const { loading, categories } = useCategories(initialCategories);
  const [quizSetup, setQuizSetup] = useState({ questionCount: 1, category: null, difficulty: null });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResponses, setQuizResponses] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  return (
    <GlobalContext.Provider value={{ loading, categories, quizSetup, setQuizSetup, selectedQuiz, setSelectedQuiz, quizResponses, setQuizResponses, filteredQuestions, setFilteredQuestions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);