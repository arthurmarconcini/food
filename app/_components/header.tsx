"use client";

import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./search";
import { useEffect } from "react";

const Header = () => {
  const path = usePathname().split("/")[1];

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex items-center justify-between px-5 py-6 xl:container xl:mx-auto  ">
      <Link href={"/"}>
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="Foods"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {path === "categories" && (
        <Search className="hidden xl:block xl:w-full xl:max-w-2xl" />
      )}

      <Button variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
