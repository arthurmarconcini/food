"use client";

import CartDetails from "./cart-details";
import CartItem from "./cart-item";

import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "./ui/sheet";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { CartContext } from "../_providers/cart";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../_helpers/price";
import FinishOrderButton from "./finish-order-button";

const Cart = () => {
  const { products, total } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  if (!products.length) {
    return null;
  }

  const handleFinishOrderClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="mb-20"></div>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 flex w-full items-center justify-between border border-[#ffffff] bg-white px-5 pb-5 pt-3"
        >
          <div>
            <h1 className="text-xs text-muted-foreground">Total sem entrega</h1>
            <div>
              <span className="font-semibold">{formatCurrency(total)}</span>
              <span className="text-xs text-muted-foreground">{`/ ${products.reduce(
                (acc, product) => {
                  return acc + product.quantity;
                },
                0,
              )} Item`}</span>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Ver sacola</Button>
            </SheetTrigger>
            <SheetContent className="w-[90%]">
              <div className="h-[calc(100%-48px)]  py-4">
                <SheetHeader>
                  <h1 className="mb-6 text-left text-lg font-semibold">
                    Sacola
                  </h1>
                </SheetHeader>

                <div className="flex h-full flex-1 flex-col justify-between">
                  <div className="flex flex-col gap-4 overflow-y-auto ">
                    {products.map((product) => (
                      <CartItem key={product.id} product={product} />
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    <CartDetails />
                    <Button onClick={handleFinishOrderClick}>
                      Finalizar pedido
                    </Button>
                    <FinishOrderButton
                      isOpen={isOpen}
                      setIsOpen={() => setIsOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Cart;
