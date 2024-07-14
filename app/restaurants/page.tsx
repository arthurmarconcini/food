import { Suspense } from "react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Restaurants from "./_components/restaurants";

export default async function RestaurantsPage() {
  const data = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: data?.user.id,
    },
  });

  return (
    <Suspense>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
}
