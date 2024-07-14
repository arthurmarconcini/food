import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";

import RestaurantItem from "../_components/restaurant-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";

export default async function FavoriteRestaurantsPage() {
  const data = await getServerSession(authOptions);

  const favoritedRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: data?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <Header />

      <div className="flex flex-col gap-5 px-5 xl:container xl:mx-auto">
        {data ? (
          <>
            <h1 className="text-lg font-semibold">
              Meus Restaurantes Favoritos
            </h1>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {favoritedRestaurants.map((restaurant) => {
                return (
                  <RestaurantItem
                    restaurant={restaurant.restaurant}
                    key={restaurant.restaurant.id}
                    userFavoriteRestaurants={favoritedRestaurants}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <h1 className="text-lg font-semibold">
            Faça seu login para ver seus restaurantes favoritos
          </h1>
        )}
      </div>
    </div>
  );
}
