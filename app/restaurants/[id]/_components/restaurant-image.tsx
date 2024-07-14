"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "@/app/_components/heart-button";

interface ProductImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  userFavoritedRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoritedRestaurants,
}: ProductImageProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

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

      <HeartButton
        restaurantId={restaurant.id}
        userFavoritedRestaurants={userFavoritedRestaurants}
        className="absolute right-4 top-4 z-10"
      />
      <div className="absolute bottom-0 h-4 w-full rounded-t-lg bg-white" />
    </div>
  );
};

export default RestaurantImage;
