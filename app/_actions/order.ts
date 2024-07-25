"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/meus-pedidos");
};

export default createOrder;
