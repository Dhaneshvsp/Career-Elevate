//utils/schema.js
import { pgTable, serial, varchar,text, jsonb, timestamp,integer,boolean, real} from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns').notNull(),
    userAns:text('userAns'),  
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})

export const Resumes = pgTable("resumes", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(), // Ties to user
    data: jsonb("data").notNull(), // Entire resume object
    lastSaved: timestamp("last_saved").defaultNow().$onUpdate(() => new Date()), // Tracks last save
    createdAt: timestamp("created_at").defaultNow(), // Creation date
  });


  export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    image: text('image'),
  });
  
  export const quizzes = pgTable('quizzes', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    image: text('image'),
    categoryId: integer('category_id').references(() => categories.id),
  });
  
  export const questions = pgTable('questions', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    difficulty: text('difficulty'),
    quizId: integer('quiz_id').references(() => quizzes.id),
  });
  
  export const options = pgTable('options', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    isCorrect: boolean('is_correct').notNull(),
    questionId: integer('question_id').references(() => questions.id),
  });
  
  export const categoryStats = pgTable('category_stats', {
    id: serial('id').primaryKey(),
    attempts: integer('attempts').notNull().default(0),
    averageScore: real('average_score'), // Changed from float to real
    categoryId: integer('category_id').references(() => categories.id),
    completed: integer('completed').notNull().default(0),
    lastAttempt: timestamp('last_attempt'),
    userId: integer('user_id').notNull().references(() => users.id), // Already fixed to integer
  });


  export const responses = pgTable('responses', {
    id: serial('id').primaryKey(),
    questionId: integer('question_id').references(() => questions.id).notNull(),
    optionId: integer('option_id').references(() => options.id).notNull(),
    isCorrect: boolean('is_correct').notNull(),
    userId: text('user_id').notNull(),  // Assuming users are tracked
});



export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  clerkId: text("clerk_id").notNull(), // Ensure this matches the DB column name
});


//   export const QuizCategory = pgTable("quiz_category", {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 255 }).notNull().unique()
// });

// export const Quiz = pgTable("quiz", {
//     id: serial("id").primaryKey(),
//     categoryId: integer("category_id").notNull().references(() => QuizCategory.id),
//     difficulty: varchar("difficulty", { length: 50 }).notNull(),
//     totalQuestions: integer("total_questions").notNull(),
//     createdAt: timestamp("created_at").defaultNow()
// });

// export const Question = pgTable("question", {
//     id: serial("id").primaryKey(),
//     quizId: integer("quiz_id").notNull().references(() => Quiz.id),
//     text: text("text").notNull(),
//     options: text("options").notNull(), // Stored as JSON string
//     correctAnswer: varchar("correct_answer").notNull()
// });

// export const UserQuizResult = pgTable("user_quiz_result", {
//     id: serial("id").primaryKey(),
//     userEmail: varchar("user_email", { length: 255 }).notNull(),
//     quizId: integer("quiz_id").notNull().references(() => Quiz.id),
//     score: integer("score").notNull(),
//     createdAt: timestamp("created_at").defaultNow()
// });
// export const resumes = pgTable('resumes', {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     email: text('email').notNull(),
//     phone: text('phone').notNull(),
//     summary: text('summary'),
//     skills: jsonb('skills').default([]),
//     education: jsonb('education').default([]),
//     experience: jsonb('experience').default([]),
//     createdAt: varchar('created_at'),
//   });