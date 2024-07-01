import { db } from "@/app/_lib/prisma";

export async function GET() {
  const res = await db.restaurant.findMany({});

  return Response.json(res);
}
