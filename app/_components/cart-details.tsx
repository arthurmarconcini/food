"use client";

import { useContext } from "react";
import { Card } from "./ui/card";
import { CartContext } from "../_providers/cart";
import { formatCurrency } from "../_helpers/price";

const CartDetails = () => {
  const { total, subtotal, totalDiscount } = useContext(CartContext);

  return (
    <Card className="bg-background">
      <div className="not-last-child-border-b flex flex-col p-5">
        <div className="flex items-center justify-between pb-2 text-xs">
          <p className="text-muted-foreground">Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between py-2 text-xs">
          <p className="text-muted-foreground">Entrega</p>
          <p className="text-primary">GRATIS</p>
        </div>
        <div className="flex items-center justify-between py-2 text-xs">
          <p className="text-muted-foreground">Descontos</p>
          <p>{formatCurrency(totalDiscount)}</p>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm font-semibold">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </Card>
  );
};

export default CartDetails;
