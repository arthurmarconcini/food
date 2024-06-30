import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 py-6 lg:container lg:mx-auto ">
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

      <Button variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
