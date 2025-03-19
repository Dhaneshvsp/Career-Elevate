"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";

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
    <div
      className="border-2 rounded-xl p-1 cursor-pointer shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]
        hover:-translate-y-1 transition-transform duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div className="py-2 px-6 flex flex-col gap-4">
        <div className="rounded-xl h-[16rem] py-1 bg-[#97dbff]/20">
          <Image
            src={
              quiz.image
                ? quiz.image
                : `/categories/image--${quiz.title
                    .toLowerCase()
                    .split(" ")
                    .join("-")}.svg`
            }
            alt="quiz image"
            width={300}
            height={200}
            className="h-full rounded-xl"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-gray-600 leading-none font-semibold">
            {quiz.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;