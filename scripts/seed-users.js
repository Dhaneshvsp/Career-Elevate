// scripts/seed-users.js
import { db } from "../utils/db.js";
import { users } from "../utils/schema.js";

async function seedUsers() {
  const clerkId = "user_2u5XZcI1mdN768yLPzO0VgMQdpE"; // From the logs
  await db.insert(users).values({
    email: "test@example.com",
    name: "Test User",
    clerkId: clerkId,
  });
  console.log("User seeded with clerkId:", clerkId);
}

seedUsers().then(() => process.exit(0)).catch(() => process.exit(1));