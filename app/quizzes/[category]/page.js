import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CategoryPage = ({ params }) => {
  const router = useRouter();
  const { category } = params;
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`/api/quizzes?category=${category}`);
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    
    fetchQuizzes();
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Quizzes</h1>
      <div className="space-y-6">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border rounded-lg shadow-md p-4 flex cursor-pointer hover:shadow-lg"
              onClick={() => router.push(`/quiz/${quiz.id}`)}
            >
              <Image
                src={quiz.imageUrl}
                alt={quiz.title}
                width={150}
                height={150}
                className="rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
                <p className="text-sm text-gray-500 mt-2">Total Questions: <strong>{quiz.totalQuestions}</strong></p>
              </div>
            </div>
          ))
        ) : (
          <p>No quizzes found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;