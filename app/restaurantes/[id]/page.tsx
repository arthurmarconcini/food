import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";

import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const data = await getServerSession(authOptions);

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
      categories: true,
    },
  });

  const userFavoritedRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: data?.user.id,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userFavoritedRestaurants={userFavoritedRestaurants}
      />
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
