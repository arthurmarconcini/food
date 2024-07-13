import { UserFavoriteRestaurant } from "@prisma/client";

export default function checkFavoritedRestaurant(
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) {
  const isFavorite = userFavoriteRestaurants.some(
    (favorite) => favorite.restaurantId === restaurantId,
  );

  return isFavorite;
}
