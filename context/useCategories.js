"use client";
import { useEffect, useState } from "react";

const useCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { loading, categories };
};

export default useCategories;
