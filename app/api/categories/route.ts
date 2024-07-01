import { db } from "@/app/_lib/prisma";

export async function GET() {
  const res = await db.category.findMany({});

  return Response.json(res);
}
