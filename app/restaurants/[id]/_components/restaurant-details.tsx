import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: {
    id: string;
    name: string;
    imageUrl: string;
    deliveryFee: number;
    deliveryTimeMinutes: number;
    products: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      price: number;
      discountPercentage: number;
      restaurantId: string;
      categoryId: string;
    }[];
  };
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div>
      {/* Detalhes do restaurante */}
      <div className="pb-5">
        <div className="flex justify-between px-5 pb-4 pt-1">
          <div className="flex gap-2">
            <div className="relative size-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
        </div>
        <div className="px-5 pb-5">
          <Card className="flex justify-around px-[50px] py-2.5">
            <div className="flex flex-col items-center justify-items-center gap-1 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <h1 className="text-xs">Entrega</h1>
                <BikeIcon size={13} />
              </div>
              {restaurant.deliveryFee > 0 ? (
                <span className="font-semibold">
                  {formatCurrency(restaurant.deliveryFee)}
                </span>
              ) : (
                <h1 className="font-semibold">Gratis</h1>
              )}
            </div>
            <div className="flex flex-col items-center justify-items-center gap-1 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <h1 className="text-xs">Entrega</h1>
                <TimerIcon size={13} />
              </div>
              <span className="font-semibold">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-2 px-5 pb-4 text-center">
          <div className="rounded-sm bg-muted px-1.5 py-1 text-xs text-muted-foreground">
            Japonesa
          </div>
          <div className="rounded-sm bg-muted px-1.5 py-1 text-xs text-muted-foreground">
            Sucos
          </div>
        </div>
      </div>

      {/* Mais pedidos */}
      {/* Comida japonesa */}
      {/* Sucos */}
    </div>
  );
};

export default RestaurantDetails;
