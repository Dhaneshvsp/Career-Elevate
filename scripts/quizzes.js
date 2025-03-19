import { db } from "../utils/db.js";  // Fix path
import { quizzes, categories } from "../utils/schema.js";
import { eq } from "drizzle-orm"; // Needed for filtering

const quizData = [
  { title: "Computer Science Basics", description: "A quiz about fundamental computer science concepts.", categoryName: "Technology" },
  { title: "Programming Fundamentals", description: "Test your knowledge of basic programming concepts.", categoryName: "Programming" },
  { title: "Data Structures", description: "Assess your understanding of data structures.", categoryName: "Programming" },
  { title: "Physics", description: "Test your knowledge of physics.", categoryName: "Science" },
  { title: "Biology", description: "Test your knowledge of biology.", categoryName: "Science" },
  { title: "Chemistry", description: "Test your knowledge of chemistry.", categoryName: "Science" },
];

async function seedQuizzes() {
  try {
    console.log("Seeding quizzes...");

    for (const quiz of quizData) {
      const category = await db.select().from(categories).where(eq(categories.name, quiz.categoryName));

      if (category.length === 0) {
        throw new Error(`Category '${quiz.categoryName}' not found. Insert categories first!`);
      }

      await db.insert(quizzes).values({
        title: quiz.title,
        description: quiz.description,
        categoryId: category[0].id,  // ✅ Use correct integer ID
      });
    }

    console.log("Quizzes added successfully!");
  } catch (error) {
    console.error("Error seeding quizzes:", error);
  } finally {
    process.exit(); // Ensures script exits after execution
  }
}

seedQuizzes();
