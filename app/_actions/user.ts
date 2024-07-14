"use server";

import { db } from "@/app/_lib/prisma";

async function getUserByName(name: string | null | undefined) {
  const user = await db.user.findFirst({
    where: {
      name,
    },
  });

  return user;
}

export default getUserByName;
