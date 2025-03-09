'use client';

import { useEffect, useState } from 'react';
import ResumeBuilder from './_Components/ResumeBuilder';
export default function ResumeBuilderPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchResumes() {
      try {
        const response = await fetch('/api/resumes');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ResumeBuilder resumeData={data} />
    </div>
  );
}
