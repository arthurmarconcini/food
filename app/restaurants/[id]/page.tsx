import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
      categories: true,
    },
  });

  const data = await getServerSession(authOptions);

  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      user: {
        name: data?.user?.name,
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        favoriteRestaurants={favoriteRestaurants}
      />

      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
