import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = (): PostgresJsDatabase => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");

    return {
      insert: () => {
        throw new Error("Database is not configured");
      },
      select: () => {
        throw new Error("Database is not configured");
      },
    } as unknown as PostgresJsDatabase;
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
