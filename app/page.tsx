import CategoryList from "./_components/category-list";
import Header from "./_components/header";

import ProductList from "./_components/product-list";

import { ChevronRightIcon } from "lucide-react";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Image from "next/image";

import Link from "next/link";
import { db } from "./_lib/prisma";
import SearchHeader from "./_components/search-header";

export default async function Home() {
  const products = await db.product.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="relative">
      <Header />

      <div className="xl:bg-[#EA1D2C] xl:pt-0">
        <div className="px-5 xl:container xl:mx-auto xl:grid xl:h-[500px] xl:grid-cols-2">
          <SearchHeader />
          <div className="relative hidden justify-end xl:flex">
            <Image
              src={"/pratoimage.png"}
              alt="Prato"
              width={360}
              height={360}
              className=" absolute bottom-0 object-contain"
            />
          </div>
        </div>
      </div>
      <div className=" xl:container xl:mx-auto ">
        <div className="px-5 pt-6 xl:px-0">
          <CategoryList />
        </div>
        <div className="px-5 pt-6 xl:hidden xl:px-0">
          <PromoBanner
            src="/banner-promo-01.png"
            alt="Ate 30% de Desconto em Pizzas."
          />
        </div>
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between px-5 xl:px-0">
            <h2 className="font-semibold">Produtos Recomendados</h2>
            <Link
              href={{
                pathname: "/produtos",
              }}
              className="inline-flex h-fit items-center gap-1 p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </div>
          <ProductList products={products} />
        </div>
        <div className="hidden grid-cols-2 gap-5 pt-6 xl:grid ">
          <PromoBanner
            src="/banner-promo-01.png"
            alt="Ate 30% de Desconto em Pizzas."
          />
          <PromoBanner
            src="/banner-promo-02.png"
            alt="A partir de 17,90 R$ em lanches."
          />
        </div>
        <div className="px-5 pt-6 xl:hidden xl:px-0">
          <PromoBanner
            src="/banner-promo-02.png"
            alt="A partir de 17,90 R$ em lanches."
          />
        </div>
        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between px-5 xl:px-0">
            <h2 className="font-semibold">Restaurantes Recomendados</h2>
            <Link
              href={{
                pathname: "/restaurantes",
              }}
              className="inline-flex h-fit items-center gap-1 p-0 text-primary hover:bg-transparent"
            >
              ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </div>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
}
