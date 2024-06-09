import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const CartItem = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="relative size-20">
        <Image
          src={
            "https://utfs.io/f/5ef70d5c-892b-424d-8655-6bc2716411e1-1lryd0.png"
          }
          alt="Image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  );
};

export default CartItem;
