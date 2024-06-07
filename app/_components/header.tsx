import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Card } from "./ui/card";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="Foods" height={30} width={100} />
      <Sheet>
        <SheetTrigger>
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
                <div className="flex w-full gap-4">
                  <div className="relative size-20">
                    <Image
                      src={
                        "https://utfs.io/f/5ef70d5c-892b-424d-8655-6bc2716411e1-1lryd0.png"
                      }
                      alt="Image"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h1 className="text-xs">Sushi</h1>
                      <div className="space-x-2 ">
                        <span className="text-sm font-semibold">R$ 20.00</span>
                        <span className="text-xs">R$ 18.00</span>
                      </div>
                      <div className="flex items-center gap-2 text-center">
                        <Button
                          className="size-8 border border-solid border-muted-foreground p-1 "
                          variant={"ghost"}
                        >
                          <ChevronLeftIcon className="w-8" />
                        </Button>
                        <span className="w-4">{1}</span>
                        <Button size={"icon"} className=" size-8 p-1">
                          <ChevronRightIcon />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant={"secondary"}
                        className="mr-2 size-8 border border-[#EEEEEE] bg-transparent p-0"
                      >
                        <TrashIcon width={16} height={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <Card className="bg-background">
                  <div className="not-last-child-border-b flex flex-col p-5">
                    <div className="flex items-center justify-between pb-2 text-xs">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>R$ 35,00</p>
                    </div>
                    <div className="flex items-center justify-between py-2 text-xs">
                      <p className="text-muted-foreground">Entrega</p>
                      <p className="text-primary">GRATIS</p>
                    </div>
                    <div className="flex items-center justify-between py-2 text-xs">
                      <p className="text-muted-foreground">Descontos</p>
                      <p>-R$ 3,50</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 text-sm font-semibold">
                      <p>Total</p>
                      <p>R$ 31,50</p>
                    </div>
                  </div>
                </Card>

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
