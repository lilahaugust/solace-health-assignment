import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  let data;

  try {
    // Use database if available; fall back to seed data
    data = await db.select().from(advocates);
  } catch (error) {
    console.error("Database query failed, using seed data:", error);
    data = advocateData;
  }

  return Response.json({ data });
}

