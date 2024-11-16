import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({
  path: ".env.local",
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

export { db };
