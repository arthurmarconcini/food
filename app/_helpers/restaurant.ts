import { UserFavoriteRestaurant } from "@prisma/client";

export default function isFavoritedRestaurant(
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) {
  return userFavoriteRestaurants.some(
    (favorite) => favorite.restaurantId === restaurantId,
  );
}
