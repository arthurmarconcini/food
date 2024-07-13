"use client";

import { Button } from "@/app/_components/ui/button";
import checkFavoritedRestaurant from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant, User, UserFavoriteRestaurant } from "@prisma/client";

import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getUserByName from "../_actions/getUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProductImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  favoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  favoriteRestaurants,
}: ProductImageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFavoritedRestaurant, setIsFavoritedRestaurant] = useState(false);
  const { data: sessionData } = useSession();

  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  const { handleClickToggleFavoriteRestaurant } = useToggleFavoriteRestaurant({
    userId: user?.id,
    restaurantId: restaurant.id,
  });

  const handleFavoriteClick = async () => {
    if (!user) {
      return;
    }

    await handleClickToggleFavoriteRestaurant();
    setIsFavoritedRestaurant(!isFavoritedRestaurant);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (sessionData?.user?.name) {
        const user = await getUserByName(sessionData.user.name);
        setUser(user);
      }
    };

    fetchUser();
  }, [sessionData]);

  useEffect(() => {
    if (user) {
      setIsFavoritedRestaurant(
        checkFavoritedRestaurant(restaurant.id, favoriteRestaurants),
      );
    }
  }, [favoriteRestaurants, restaurant, user]);

  return (
    <div className="relative h-[200px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        className="absolute right-4 top-4 rounded-full bg-white/20 hover:bg-white/20"
        size="icon"
        onClick={handleFavoriteClick}
      >
        {isFavoritedRestaurant ? (
          <HeartIcon className="fill-yellow-400 text-yellow-400" size={16} />
        ) : (
          <HeartIcon className="fill-white text-white" size={16} />
        )}
      </Button>
      <div className="absolute bottom-0 h-4 w-full rounded-t-lg bg-white" />
    </div>
  );
};

export default RestaurantImage;
