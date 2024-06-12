import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Image
          src="/logo.png"
          alt="Foods"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <Button variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
