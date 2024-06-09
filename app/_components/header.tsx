import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

import CartItem from "./cart-item";
import CartDetails from "./cart-details";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image
        src="/logo.png"
        alt="Foods"
        height={30}
        width={100}
        className="h-auto w-auto"
        priority={true}
      />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="h-[calc(100%-48px)] py-4">
            <SheetHeader>
              <h1 className="mb-6 text-left text-lg font-semibold">Sacola</h1>
            </SheetHeader>

            <div className="flex h-full flex-1 flex-col justify-between">
              <div className="flex flex-col gap-4 overflow-y-auto ">
                <CartItem />
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <CartDetails />
                <Button>Finalizar Pedido</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
