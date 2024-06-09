import ProductList from "@/app/_components/product-list";
import { Card } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";

import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";

import { Prisma } from "@prisma/client";

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      products: true;
      categories: true;
    };
  }>;
}

const RestaurantDetails = async ({ restaurant }: RestaurantDetailsProps) => {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
      category: true,
    },
    where: {
      restaurantId: restaurant.id,
    },
  });

  const randomProducts = products.sort(() => Math.random() - 0.5).slice(0, 10);

  return (
    <div className="mb-10">
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
              {Number(restaurant.deliveryFee) > 0 ? (
                <span className="font-semibold">
                  {formatCurrency(Number(restaurant.deliveryFee))}
                </span>
              ) : (
                <h1 className="font-semibold">Grátis</h1>
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
      <div className="mb-5 space-y-4">
        <h3 className="px-5 font-semibold">Mais pedidos</h3>
        <ProductList products={randomProducts} />
      </div>

      {/* Categorias */}
      {restaurant.categories?.map((category) => (
        <div key={category.id} className="mb-5 space-y-4">
          <h3 className="px-5 font-semibold">{category.name}</h3>
          <ProductList
            products={products.filter(
              (product) => product.categoryId === category.id,
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetails;
