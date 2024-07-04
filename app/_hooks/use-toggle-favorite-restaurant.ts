import { toggleFavoriteRestaurant } from "../_actions/restaurant";

interface UseToggleFavoriteRestaurant {
  userId?: string;
  restaurantId: string;
  isFavoriteRestaurant?: boolean;
}

function useToggleFavoriteRestaurant({
  userId,
  restaurantId,
}: UseToggleFavoriteRestaurant) {
  const handleClickToggleFavoriteRestaurant = async () => {
    if (!userId) {
      return;
    }

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleClickToggleFavoriteRestaurant };
}

export default useToggleFavoriteRestaurant;
