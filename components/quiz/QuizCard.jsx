// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useGlobalContext } from "@/context/globalContext";

// function QuizCard({ quiz }) {
//   const router = useRouter();
//   const { setSelectedQuiz } = useGlobalContext();

//   const handleClick = () => {
//     console.log("[QuizCard] Setting selectedQuiz:", quiz);
//     setSelectedQuiz(quiz);
//     sessionStorage.setItem("selectedQuiz", JSON.stringify(quiz));
//     router.push(`/quizmodule/quiz/setup/${quiz.id}`);
//   };

//   return (
//     <div
//       className="border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]
//         hover:-translate-y-1 transition-transform duration-300 ease-in-out"
//       onClick={handleClick}
//     >
//       <div className="py-2 px-6 flex flex-col gap-4">
//         <div className="rounded-xl h-[16rem] py-1 bg-[#97dbff]/20">
//           <Image
//             src={
//               quiz.image
//                 ? quiz.image
//                 : `/categories/image--${quiz.title
//                     .toLowerCase()
//                     .split(" ")
//                     .join("-")}.svg`
//             }
//             alt="quiz image"
//             width={300}
//             height={200}
//             className="h-full rounded-xl"
//           />
//         </div>

//         <div>
//           <h2 className="text-xl font-bold">{quiz.title}</h2>
//           <p className="text-gray-600 leading-none font-semibold">
//             {quiz.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizCard;
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { motion } from "framer-motion";

function QuizCard({ quiz }) {
  const router = useRouter();
  const { setSelectedQuiz } = useGlobalContext();

  const handleClick = () => {
    console.log("[QuizCard] Setting selectedQuiz:", quiz);
    setSelectedQuiz(quiz);
    sessionStorage.setItem("selectedQuiz", JSON.stringify(quiz));
    router.push(`/quizmodule/quiz/setup/${quiz.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm bg-white border-2 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-lg bg-blue-100/20">
        <Image
          src={
            quiz.image
              ? quiz.image
              : `/categories/image--${quiz.title.toLowerCase().split(" ").join("-")}.svg`
          }
          alt="quiz image"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => (e.target.src = "/categories/default-quiz-image.svg")}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-1">
          {quiz.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium line-clamp-2">
          {quiz.description}
        </p>
      </div>
    </motion.div>
  );
}

export default QuizCard;