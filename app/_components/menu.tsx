"use client";

import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import MenuList from "./menu-list";

import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Menu = () => {
  const path = usePathname().split("/")[1];

  const { data, status } = useSession();

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
          <div>
            {status === "authenticated" && data.user.image ? (
              <div className="flex items-center gap-2">
                <Image
                  src={data.user.image}
                  alt={data.user.name || "imagem do usuário"}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-primary"
                />
                <div>
                  <h1 className="font-semibold">{data.user.name}</h1>
                  <h2 className="text-xs text-muted-foreground">
                    {data.user.email}
                  </h2>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <h1 className="font-semibold ">Olá. Faça seu login!</h1>
                <Button onClick={() => signIn()}>
                  <LogInIcon />
                </Button>
              </div>
            )}
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
              <span className="text-sm font-semibold">Início</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/meus-pedidos`}
              className={`flex items-center gap-3 px-3 py-4 ${
                path === "meus-pedidos"
                  ? "rounded-full bg-primary text-white"
                  : ""
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

        {status === "authenticated" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"link"} className="mt-4 flex items-center gap-2">
                <LogOutIcon />
                Sair da conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Deseja mesmo sair da plataforma?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-0 bg-muted">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() => {
                      if (status === "authenticated") {
                        signOut();
                      }
                    }}
                  >
                    Sair
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
