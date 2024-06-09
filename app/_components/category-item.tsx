import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
      <div className="relative size-8">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
