import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Cake, Beer, Pizza, Utensils, Fish as Sushi } from "lucide-react";

const categoryIcons: any = {
  Sobremesas: Cake,
  Sucos: Beer,
  Pizzas: Pizza,
  Japonesa: Sushi,
  Brasileira: Utensils,
};

const getCategoryIcon = (categoryName: string) => {
  const IconComponent = categoryIcons[categoryName] || Utensils; // Utensils como ícone padrão
  return <IconComponent size={16} />; // Ajuste o tamanho conforme necessário
};

export default function MenuList() {
  const [categories, setCategories] = useState<Category[]>([]);

  const path = usePathname().split("/")[2];

  useEffect(() => {
    async function fetchData() {
      const categories = await fetch(
        "http://localhost:3000/api/categories",
      ).then((res) => res.json());
      setCategories(categories);
    }

    fetchData();
  }, []);

  return (
    <ul className="mt-6 border-b border-b-slate-200 pb-6">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.id}`}
            className={`flex items-center gap-3 px-3 py-4 ${
              path === category.id ? "rounded-full bg-primary text-white" : ""
            }`}
          >
            {getCategoryIcon(category.name)}
            <span className="text-sm font-semibold">{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
