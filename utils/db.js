// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from './schema';
// const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
// export const db = drizzle({ client: sql },{schema});

import "dotenv/config";  // ✅ Ensures environment variables are loaded
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";

const databaseUrl = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

if (!databaseUrl) {
  throw new Error("❌ Database connection string is missing. Check your .env.local file.");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
