import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const categoryProducts = await db.product.findMany({
    where: {
      categoryId: id,
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  });

  const category = await db.category.findUnique({
    where: {
      id,
    },
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-lg font-semibold">{category!.name}</h1>
        <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap">
          {categoryProducts.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
