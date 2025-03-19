import { db } from "../utils/db.js";
import { questions, options } from "../utils/schema.js";

async function deleteAllQuestions() {
  try {
    console.log("Deleting all questions and options...");
    await db.delete(options);  // Delete all options first (to avoid foreign key issues)
    await db.delete(questions); // Delete all questions
    console.log("All questions and options deleted.");
  } catch (error) {
    console.error("Error deleting questions:", error);
  } finally {
    process.exit();
  }
}

deleteAllQuestions();
