// import { db } from "@/utils/db";
// import { categories } from "@/utils/schema";

// async function addCategories() {
//   const categoryData = [
//     { name: "Science", description: "Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence." },
//     { name: "Technology", description: "Dive into the latest technological advancements." },
//     { name: "Programming", description: "Learn about coding and software development." },
//     { name: "Computer Science", description: "Understand the fundamentals of computers and algorithms." },
//     { name: "Mathematics", description: "Master the language of numbers and patterns." },
//     { name: "History", description: "Discover the events that shaped our world." },
//     { name: "Art", description: "Appreciate creativity through various forms of art." },
//     { name: "Geography", description: "Explore the physical features of our planet." },
//     { name: "Physics", description: "Unravel the laws governing the universe." },
//     { name: "Biology", description: "Study the science of living organisms." },
//   ];

//   try {
//     console.log("Adding Categories...");
//     await db.insert(categories).values(categoryData);
//     console.log("Categories Added Successfully!");
//   } catch (error) {
//     console.error("Error Adding Categories:", error);
//   }
// }

// addCategories();


import "dotenv/config"; // This loads .env.local variables
import { db } from "../utils/db.js"; // Ensure the correct path
import { categories } from "../utils/schema.js";

async function addCategories() {
  const categoryData = [
    { name: "Science", description: "Science is the pursuit and application of knowledge and understanding of the natural and social world following a systematic methodology based on evidence." },
    { name: "Technology", description: "Dive into the latest technological advancements." },
    { name: "Programming", description: "Learn about coding and software development." },
    { name: "Computer Science", description: "Understand the fundamentals of computers and algorithms." },
    { name: "Mathematics", description: "Master the language of numbers and patterns." },
    { name: "History", description: "Discover the events that shaped our world." },
    { name: "Art", description: "Appreciate creativity through various forms of art." },
    { name: "Geography", description: "Explore the physical features of our planet." },
    { name: "Physics", description: "Unravel the laws governing the universe." },
    { name: "Biology", description: "Study the science of living organisms." },
  ];

  try {
    console.log("Adding Categories...");

    // Ensure database URL is available
    if (!process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
      throw new Error("❌ Database connection string is missing. Check your .env.local file.");
    }

    await db.insert(categories).values(categoryData);
    console.log("✅ Categories Added Successfully!");

    const result = await db.select().from(categories);
    console.log("📌 Current categories:", result);
  } catch (error) {
    console.error("❌ Error Adding Categories:", error);
  } finally {
    process.exit(); // Ensure script exits after execution
  }
}

addCategories();
