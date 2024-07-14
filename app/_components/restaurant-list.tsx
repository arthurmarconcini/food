import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const data = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({});
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: data?.user.id,
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 xl:px-0 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          restaurant={restaurant}
          key={restaurant.id}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
