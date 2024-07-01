"use client";

import { useEffect, useState } from "react";

import CategoryItem from "./category-item";
import { Category } from "@prisma/client";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 overflow-x-scroll pb-1 xl:flex">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
