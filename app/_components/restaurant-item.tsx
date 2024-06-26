import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
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
        <Button
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-600/60"
          size={"icon"}
        >
          <HeartIcon className=" fill-white text-white" size={16} />
        </Button>
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
