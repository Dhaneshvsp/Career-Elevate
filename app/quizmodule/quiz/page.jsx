// //quizmodule/quiz/page.jsx:
// "use client";

// import { Button } from "@/components/ui/button";
// import { useGlobalContext } from "@/context/globalContext";
// import { flag, next } from "@/utils/icons";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { finishQuiz } from "../actions";

// function QuizPage() {
//   const {
//     selectedQuiz,
//     quizSetup,
//     setQuizSetup,
//     setQuizResponses,
//     filteredQuestions,
//   } = useGlobalContext();
//   const router = useRouter();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const [responses, setResponses] = useState([]);
//   const [shuffledOptions, setShuffledOptions] = useState([]);
//   const [shuffledQuestions, setShuffledQuestions] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(30);

//   // Handle navigation if selectedQuiz is not available
//   useEffect(() => {
//     if (!selectedQuiz) {
//       console.log("[QuizPage] No selectedQuiz, redirecting to /quizmodule");
//       router.push("/quizmodule");
//     }
//   }, [selectedQuiz, router]);

//   useEffect(() => {
//     if (!selectedQuiz) return; // Prevent further execution if redirecting

//     const allQuestions = filteredQuestions.slice(0, quizSetup?.questionCount);
//     console.log("[QuizPage] Filtered questions:", filteredQuestions);
//     console.log("[QuizPage] Slicing to questionCount:", quizSetup?.questionCount);
//     console.log("[QuizPage] All questions before shuffle:", allQuestions);
//     setShuffledQuestions(shuffleArray([...allQuestions]));
//     console.log("[QuizPage] Shuffled questions:", shuffledQuestions);
//   }, [selectedQuiz, quizSetup, filteredQuestions]);

//   useEffect(() => {
//     if (shuffledQuestions[currentIndex]) {
//       setShuffledOptions(shuffleArray([...shuffledQuestions[currentIndex].options]));
//       setTimeLeft(30);
//       console.log("[QuizPage] Current question:", shuffledQuestions[currentIndex]);
//       console.log("[QuizPage] Shuffled options:", shuffledOptions);
//     }
//   }, [shuffledQuestions, currentIndex]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleNextQuestion();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//       if (timeLeft <= 6) {
//         try {
//           new Audio("/sounds/warning.mp3").play();
//         } catch (error) {
//           console.error("[QuizPage] Error playing warning sound:", error);
//         }
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const shuffleArray = (array) => {
//     const newArray = [...array];
//     for (let i = newArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//     }
//     return newArray;
//   };

//   const handleActiveQuestion = (option) => {
//     if (!shuffledQuestions[currentIndex]) return;

//     const response = {
//       questionId: shuffledQuestions[currentIndex].id,
//       optionId: option.id,
//       isCorrect: option.isCorrect,
//     };

//     setResponses((prev) => {
//       const existingIndex = prev.findIndex((res) => res.questionId === response.questionId);
//       return existingIndex !== -1 ? prev.map((res, index) => (index === existingIndex ? response : res)) : [...prev, response];
//     });

//     setActiveQuestion(option);
//     console.log("[QuizPage] Selected option:", option);
//     console.log("[QuizPage] Current responses:", responses);
//   };

//   const handleNextQuestion = () => {
//     if (currentIndex < shuffledQuestions.length - 1) {
//       setCurrentIndex((prev) => prev + 1);
//       setActiveQuestion(null);
//       console.log("[QuizPage] Moving to next question, new index:", currentIndex + 1);
//     } else {
//       handleFinishQuiz();
//     }
//   };

//   const handleFinishQuiz = async () => {
//     setQuizResponses(responses);
//     const score = responses.filter((res) => res.isCorrect).length;

//     try {
//       console.log("[QuizPage] Finishing quiz with:", { categoryId: selectedQuiz.categoryId, quizId: selectedQuiz.id, score, responses });
//       const response = await finishQuiz(selectedQuiz.categoryId, selectedQuiz.id, score, responses);
//       console.log("[QuizPage] finishQuiz response:", response);

//       if (response?.success) {
//         console.log("[QuizPage] Quiz finished successfully");
//       } else {
//         console.error("[QuizPage] Failed to finish quiz:", response?.error);
//         toast.error(response?.error || "Failed to save quiz results");
//       }
//     } catch (error) {
//       console.error("[QuizPage] Error finishing quiz:", error);
//       toast.error("Failed to save quiz results");
//     }

//     setQuizSetup({
//       questionCount: 1,
//       category: null,
//       difficulty: null,
//     });

//     router.push("/quizmodule/results");
//   };

//   // If redirecting, return null to prevent rendering
//   if (!selectedQuiz) {
//     return null;
//   }

//   return (
//     <div className="py-[2.5rem]">
//       {shuffledQuestions[currentIndex] ? (
//         <div className="space-y-6">
//           <div className="flex flex-col gap-6">
//             <p className="py-3 px-6 border-2 text-xl font-bold self-end rounded-lg shadow-md">
//               Question: <span>{currentIndex + 1}</span> / <span className="text-3xl">{shuffledQuestions.length}</span>
//             </p>
//             <p className="text-red-500 font-bold text-xl text-center">Time Left: {timeLeft}s</p>
//             <h1 className="mt-4 px-10 text-5xl font-bold text-center">
//               {shuffledQuestions[currentIndex].text}
//             </h1>
//           </div>

//           <div className="pt-14 space-y-4">
//             {shuffledOptions.map((option, index) => (
//               <button
//                 key={index}
//                 className={`relative z-10 group py-3 w-full text-center border-2 text-lg font-semibold rounded-lg
//                   hover:bg-gray-100 transition-all duration-200 ease-in-out
//                   ${option.id === activeQuestion?.id ? "bg-green-100 border-green-500" : "shadow-md"}`}
//                 onClick={() => handleActiveQuestion(option)}
//               >
//                 {option.text}
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p className="text-lg">No questions found for this quiz</p>
//       )}

//       <div className="w-full py-[4rem] flex items-center justify-center">
//         {currentIndex < shuffledQuestions.length - 1 ? (
//           <Button
//             className="px-6 py-4 font-bold text-white text-lg rounded-lg"
//             onClick={() => {
//               if (!activeQuestion) {
//                 try {
//                   new Audio("/sounds/error.mp3").play();
//                 } catch (error) {
//                   console.error("[QuizPage] Error playing error sound:", error);
//                 }
//                 toast.error("Please select an option to continue");
//                 return;
//               }
//               handleNextQuestion();
//             }}
//           >
//             <span className="flex items-center gap-2">{next} Next</span>
//           </Button>
//         ) : (
//           <Button className="px-6 py-4 font-bold text-white text-lg rounded-lg" onClick={handleFinishQuiz}>
//             <span className="flex items-center gap-2">{flag} Finish</span>
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizPage;
"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/globalContext";
import { flag, next } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { finishQuiz } from "../actions";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

function QuizPage() {
  const {
    selectedQuiz,
    quizSetup,
    setQuizSetup,
    setQuizResponses,
    filteredQuestions,
  } = useGlobalContext();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!selectedQuiz) {
      console.log("[QuizPage] No selectedQuiz, redirecting to /quizmodule");
      router.push("/quizmodule");
    }
  }, [selectedQuiz, router]);

  useEffect(() => {
    if (!selectedQuiz) return;

    const allQuestions = filteredQuestions.slice(0, quizSetup?.questionCount);
    console.log("[QuizPage] Filtered questions:", filteredQuestions);
    console.log("[QuizPage] Slicing to questionCount:", quizSetup?.questionCount);
    console.log("[QuizPage] All questions before shuffle:", allQuestions);
    setShuffledQuestions(shuffleArray([...allQuestions]));
    console.log("[QuizPage] Shuffled questions:", shuffledQuestions);
  }, [selectedQuiz, quizSetup, filteredQuestions]);

  useEffect(() => {
    if (shuffledQuestions[currentIndex]) {
      setShuffledOptions(shuffleArray([...shuffledQuestions[currentIndex].options]));
      setTimeLeft(30);
      console.log("[QuizPage] Current question:", shuffledQuestions[currentIndex]);
      console.log("[QuizPage] Shuffled options:", shuffledOptions);
    }
  }, [shuffledQuestions, currentIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft <= 6) {
        try {
          new Audio("/sounds/warning.mp3").play();
        } catch (error) {
          console.error("[QuizPage] Error playing warning sound:", error);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleActiveQuestion = (option) => {
    if (!shuffledQuestions[currentIndex]) return;

    const response = {
      questionId: shuffledQuestions[currentIndex].id,
      optionId: option.id,
      isCorrect: option.isCorrect,
    };

    setResponses((prev) => {
      const existingIndex = prev.findIndex((res) => res.questionId === response.questionId);
      return existingIndex !== -1 ? prev.map((res, index) => (index === existingIndex ? response : res)) : [...prev, response];
    });

    setActiveQuestion(option);
    console.log("[QuizPage] Selected option:", option);
    console.log("[QuizPage] Current responses:", responses);
  };

  const handleNextQuestion = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveQuestion(null);
      console.log("[QuizPage] Moving to next question, new index:", currentIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    setQuizResponses(responses);
    const score = responses.filter((res) => res.isCorrect).length;

    try {
      console.log("[QuizPage] Finishing quiz with:", { categoryId: selectedQuiz.categoryId, quizId: selectedQuiz.id, score, responses });
      const response = await finishQuiz(selectedQuiz.categoryId, selectedQuiz.id, score, responses);
      console.log("[QuizPage] finishQuiz response:", response);

      if (response?.success) {
        console.log("[QuizPage] Quiz finished successfully");
      } else {
        console.error("[QuizPage] Failed to finish quiz:", response?.error);
        toast.error(response?.error || "Failed to save quiz results");
      }
    } catch (error) {
      console.error("[QuizPage] Error finishing quiz:", error);
      toast.error("Failed to save quiz results");
    }

    setQuizSetup({
      questionCount: 1,
      category: null,
      difficulty: null,
    });

    router.push("/quizmodule/results");
  };

  if (!selectedQuiz) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {shuffledQuestions[currentIndex] ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Progress
                value={(timeLeft / 30) * 100}
                className={`w-full sm:w-1/2 h-2 ${timeLeft <= 10 ? "bg-red-500" : "bg-blue-500"}`}
              />
              <div className="bg-white px-4 py-2 rounded-lg shadow-md">
                <span className="text-lg font-bold text-gray-800">
                  {currentIndex + 1} / {shuffledQuestions.length}
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
              {shuffledQuestions[currentIndex].text}
            </h1>
            <p className={`text-lg sm:text-xl font-semibold text-center ${timeLeft <= 10 ? "text-red-500" : "text-gray-600"}`}>
              Time Left: {timeLeft}s
            </p>
            <div className="space-y-4">
              {shuffledOptions.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-lg text-left border-2 text-base sm:text-lg font-semibold transition-all duration-200
                    ${option.id === activeQuestion?.id
                      ? "bg-green-100 border-green-500"
                      : "bg-white border-gray-200 hover:bg-gray-50 shadow-md"}`}
                  onClick={() => handleActiveQuestion(option)}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => {
                  if (!activeQuestion) {
                    try {
                      new Audio("/sounds/error.mp3").play();
                    } catch (error) {
                      console.error("[QuizPage] Error playing error sound:", error);
                    }
                    toast.error("Please select an option to continue");
                    return;
                  }
                  currentIndex < shuffledQuestions.length - 1 ? handleNextQuestion() : handleFinishQuiz();
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg flex items-center gap-2 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {currentIndex < shuffledQuestions.length - 1 ? next : flag}
                  {currentIndex < shuffledQuestions.length - 1 ? "Next" : "Finish"}
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-lg sm:text-xl text-gray-600 text-center">No questions found for this quiz</p>
        )}
      </motion.div>
    </div>
  );
}

export default QuizPage;