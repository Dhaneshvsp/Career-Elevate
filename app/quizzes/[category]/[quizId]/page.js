import { useState, useEffect } from "react";

export default function QuizPage({ params }) {
  const { quizId } = params;
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h1>Quiz {quizId}</h1>
      <p>Time Left: {timeLeft}s</p>
      {/* Question & Options */}
    </div>
  );
}