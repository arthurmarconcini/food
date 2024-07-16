"use client";

import { useState } from "react";
import Search from "./search";

const SearchHeader = () => {
  const [filter, setFilter] = useState<string>("");

  return (
    <div className="flex-col justify-center gap-8 xl:flex">
      <div className="hidden gap-4 text-white xl:flex xl:flex-col">
        <h1 className="text-5xl font-bold shadow-sm">Está com fome?</h1>
        <h2 className="text-lg">
          Com apenas alguns cliques, encontre refeições acessíveis perto de
          você.
        </h2>
      </div>
      <Search onFilterChange={setFilter} filter={filter} />
    </div>
  );
};

export default SearchHeader;
