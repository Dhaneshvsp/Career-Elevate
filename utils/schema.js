
import { pgTable, serial, varchar,text, jsonb, timestamp} from "drizzle-orm/pg-core";

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