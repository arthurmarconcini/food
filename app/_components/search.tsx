"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import React, { useEffect, useState } from "react";

interface SearchProps extends InputProps {
  className?: string;
}

const Search = ({ className, ...props }: SearchProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1280);
    };

    // Definir o estado inicial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLargeScreen) {
    return (
      <div className={`flex rounded-md bg-white p-4 ${className}`}>
        <div className="flex w-full items-center overflow-hidden rounded-md bg-background">
          <input
            {...props}
            placeholder="Buscar restaurantes"
            className="w-full bg-background px-4 py-3 focus:outline-none"
          />
          <Button size="icon" className="mr-2 bg-[#FFB100]">
            <SearchIcon size={20} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} flex gap-2`}>
      <Input
        {...props}
        placeholder="Buscar restaurantes"
        className="border-none"
      />
      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
