import { db } from "../utils/db.js";
import { questions, quizzes, options } from "../utils/schema.js";
import { eq } from "drizzle-orm";
import programmingQuestions from "../data/programmingQuestions.js";
import csQuestions from "../data/csQuestions.js";
import dsQuestions from "../data/dsQuestions.js";
import physicsQuestions from "../data/physicsQuestions.js";
import chemistryQuestions from "../data/chemistryQuestions.js";
import biologyQuestions from "../data/biologyQuestions.js";

// Map quiz titles to their corresponding data files
const questionSets = [
  { title: "Programming Fundamentals", data: programmingQuestions },
  { title: "Computer Science Basics", data: csQuestions },
  { title: "Data Structures", data: dsQuestions },
  { title: "Physics", data: physicsQuestions },
  { title: "Chemistry", data: chemistryQuestions },
  { title: "Biology", data: biologyQuestions },
];

async function seedQuestions() {
  console.log("Seeding questions...");

  try {
    for (const { title, data } of questionSets) {
      const quiz = await db.select().from(quizzes).where(eq(quizzes.title, title));

      if (quiz.length === 0) {
        console.warn(`Quiz not found for title: ${title}. Skipping.`);
        continue; // Skip if quiz is not found
      }

      const quizId = quiz[0].id; 

      for (const question of data) {
        const insertedQuestion = await db.insert(questions).values({
          text: question.text,
          quizId: quizId, 
          difficulty: question.difficulty,
        }).returning({ id: questions.id });

        if (insertedQuestion.length > 0) {
          const questionId = insertedQuestion[0].id;

          const optionData = question.options.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect,
            questionId,
          }));

          await db.insert(options).values(optionData);
          console.log(`Created question in ${title}: ${question.text}`);
        }
      }
    }
    console.log("Seeding questions completed.");
  } catch (error) {
    console.error("Error seeding questions:", error);
  } finally {
    process.exit();
  }
}

seedQuestions();
