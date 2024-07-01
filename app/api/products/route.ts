import { db } from "@/app/_lib/prisma";

export async function GET() {
  const res = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return Response.json(res);
}
