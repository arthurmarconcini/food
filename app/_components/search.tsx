"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input, InputProps } from "./ui/input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchProps extends InputProps {
  className?: string;
  filter: string;
  onFilterChange: (value: string) => void;
}

const Search = ({
  className,
  filter,
  onFilterChange,
  ...props
}: SearchProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const router = useRouter();

  const handleSearchClick = () => {
    if (filter.trim()) {
      router.push(`/restaurants?q=${encodeURIComponent(filter)}`);
    } else {
      router.push("/restaurants");
    }
  };

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
      <div className={`flex rounded-md bg-white  ${className} relative`}>
        <div className="flex w-full items-center overflow-hidden rounded-md bg-background">
          <input
            {...props}
            onChange={(e) => {
              onFilterChange(e.target.value);
            }}
            value={filter}
            placeholder="Buscar restaurantes"
            className="w-full bg-background px-4 py-3 focus:outline-none"
          />
          <Button
            onClick={handleSearchClick}
            size="icon"
            className="mr-2 bg-[#FFB100]"
          >
            <SearchIcon size={20} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative flex gap-2`}>
      <Input
        {...props}
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
        value={filter}
        placeholder="Buscar restaurantes"
        className="border-none"
      />
      <Button size="icon" onClick={handleSearchClick}>
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
