"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";

import Link from "next/link";
import HeartButton from "./heart-button";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
  restaurant: Restaurant;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();

  return (
    <Link
      href={`/restaurantes/${restaurant.id}`}
      className=" min-w-[266px] space-y-3"
    >
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          fill
          className="rounded-lg object-cover "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={restaurant.name}
        />
        <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-white px-2 py-[2px]">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
        {data?.user && (
          <HeartButton
            restaurantId={restaurant.id}
            userFavoritedRestaurants={userFavoriteRestaurants}
            className="right-2 top-2 size-7"
          />
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <BikeIcon size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Grátis"
                : `${formatCurrency(Number(restaurant.deliveryFee))}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TimerIcon size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
