import { config } from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config();

const { DATABASE_URL } = process.env;

const databaseUrl = drizzle(postgres(DATABASE_URL!, { max: 1 }));

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "drizzle" });
    console.log("Migration successful");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

main();
