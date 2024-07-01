"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./search";
import Menu from "./menu";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

  const path = usePathname().split("/")[1];

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
      <Menu />
    </div>
  );
};

export default Header;
