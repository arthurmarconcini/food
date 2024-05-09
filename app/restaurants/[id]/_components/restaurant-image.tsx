"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: ProductImageProps) => {
  const router = useRouter();
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(false);

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
      <Button
        className="absolute right-4 top-4 rounded-full bg-white/20 hover:bg-white/20"
        size="icon"
        onClick={() => setFavoriteRestaurant(!favoriteRestaurant)}
      >
        {favoriteRestaurant ? (
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
