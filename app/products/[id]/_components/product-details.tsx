"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center gap-1.5">
        <div className="relative size-4">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          <span className="block text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </span>
        </div>
        <div className="flex items-center gap-2 text-center">
          <Button
            className="border border-solid border-muted-foreground"
            variant={"ghost"}
            size={"icon"}
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size={"icon"} onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
