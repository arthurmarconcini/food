"use client";

import { Button } from "@/app/_components/ui/button";
import isFavoritedRestaurant from "@/app/_helpers/restaurant";
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
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  const isFavorite = isFavoritedRestaurant(restaurant.id, favoriteRestaurants);

  const { data } = useSession();

  const { handleClickToggleFavoriteRestaurant } = useToggleFavoriteRestaurant({
    userId: user?.id,
    restaurantId: restaurant.id,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByName(data?.user?.name);
      setUser(user!);
    };

    fetchUser();
  }, [data]);

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
        onClick={handleClickToggleFavoriteRestaurant}
      >
        {isFavorite ? (
          <HeartIcon className="fill-red-500 text-red-500" size={16} />
        ) : (
          <HeartIcon className="fill-white text-white" size={16} />
        )}
      </Button>
      <div className="absolute bottom-0 h-4 w-full rounded-t-lg bg-white" />
    </div>
  );
};

export default RestaurantImage;
