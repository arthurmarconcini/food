import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

const Header = () => {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="Foods" height={30} width={100} />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
