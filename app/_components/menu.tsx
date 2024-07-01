"use client";

import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  ScrollIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import MenuList from "./menu-list";

import { usePathname } from "next/navigation";

const Menu = () => {
  const path = usePathname().split("/")[1];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="mb-6 text-lg font-semibold">Menu</SheetTitle>
        <div className="border-b border-b-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold ">Olá. Faça seu login!</h1>
            <Button>
              <LogInIcon />
            </Button>
          </div>
        </div>

        <ul className="mt-6 border-b border-b-slate-200 pb-6">
          <li>
            <Link
              href={`/`}
              className={`flex items-center gap-3 px-3 py-4 ${
                path === "" ? "rounded-full bg-primary text-white" : ""
              }`}
            >
              <HomeIcon width={16} height={16} />
              <span className="text-sm font-semibold">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/pedidos`}
              className={`flex items-center gap-3 px-3 py-4 ${
                path === "pedidos" ? "rounded-full bg-primary text-white" : ""
              }`}
            >
              <ScrollIcon width={16} height={16} />
              <span className="text-sm font-semibold">Pedidos</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/restaurantes-favoritos`}
              className={`flex items-center gap-3 px-3 py-4 ${
                path === "restaurantes-favoritos"
                  ? "rounded-full bg-primary text-white"
                  : ""
              }`}
            >
              <HeartIcon width={16} height={16} />
              <span className="text-sm font-semibold">
                Restaurantes favoritos
              </span>
            </Link>
          </li>
        </ul>
        <MenuList />
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
