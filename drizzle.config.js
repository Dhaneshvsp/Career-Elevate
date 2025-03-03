import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:"postgresql://mock-up-interview_owner:3ivx2DfATWam@ep-dawn-flower-a5v5ng9l.us-east-2.aws.neon.tech/mock-up-interview?sslmode=require",
  }
});
