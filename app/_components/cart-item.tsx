import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { CartContext, CartProduct } from "../_providers/cart";
import { useContext } from "react";
import { cn } from "../_lib/utils";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="flex w-full gap-4">
      <div className="relative size-20">
        <Image
          src={product.imageUrl}
          alt={product.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-xs">{product.name}</h1>
          <div className="space-x-2 ">
            <span className="text-sm font-semibold">
              {formatCurrency(calculateProductTotalPrice(product).totalPrice)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          </div>
          <div className="flex items-center gap-2 text-center">
            <Button
              className={cn(
                "size-8 p-1",
                `${product.quantity === 1 && "border border-muted-foreground"}`,
              )}
              variant={`${product.quantity > 1 ? "default" : "ghost"}`}
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon className="w-8" />
            </Button>
            <span className="w-4">{product.quantity}</span>
            <Button
              size={"icon"}
              className=" size-8 p-1"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <div>
          <Button
            variant={"secondary"}
            className="mr-1 size-8 border border-[#EEEEEE] bg-transparent p-0"
            onClick={() => removeProductFromCart(product.id)}
          >
            <TrashIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
