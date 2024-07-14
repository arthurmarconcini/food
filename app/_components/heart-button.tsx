"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

import { UserFavoriteRestaurant } from "@prisma/client";
import useToggleFavoriteRestaurant from "../_hooks/use-toggle-favorite-restaurant";

import { useSession } from "next-auth/react";
import React from "react";

interface HeartButtonProps {
  restaurantId: string;
  userFavoritedRestaurants: UserFavoriteRestaurant[];
  className?: string;
}

const HeartButton = ({
  restaurantId,
  userFavoritedRestaurants,
  className,
}: HeartButtonProps) => {
  const { data } = useSession();

  const isFavorite =
    userFavoritedRestaurants?.some(
      (fav) => fav.restaurantId === restaurantId,
    ) || false;

  const { handleClickToggleFavoriteRestaurant } = useToggleFavoriteRestaurant({
    userId: data?.user.id,
    restaurantId: restaurantId,
  });

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!data?.user.id) {
      return;
    }

    await handleClickToggleFavoriteRestaurant();
  };

  return (
    <Button
      className={`${className} absolute rounded-full bg-white/20 hover:bg-white/20`}
      size="icon"
      onClick={(e) => handleFavoriteClick(e)}
    >
      {isFavorite ? (
        <HeartIcon className="fill-primary text-primary" size={16} />
      ) : (
        <HeartIcon className="fill-white text-white" size={16} />
      )}
    </Button>
  );
};

export default HeartButton;
