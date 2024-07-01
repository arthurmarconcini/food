"use client";

import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

export default function Home() {
  const [products, setProducts] = useState<
    Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
          };
        };
      };
    }>[]
  >([]);
  const [filter, setFilter] = useState(``);

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const products = await fetch("/api/products");
      const res = await products.json();
      setProducts(res);
    }

    fetchProducts();
  }, []);

  return (
    <div className="relative">
      <Header />

      <div className="xl:bg-[#EA1D2C] xl:pt-0">
        <div className="px-5 xl:container xl:mx-auto xl:grid xl:h-[500px] xl:grid-cols-2">
          <div className="flex-col justify-center gap-8 xl:flex">
            <div className="hidden gap-4 text-white xl:flex xl:flex-col">
              <h1 className="text-5xl font-bold shadow-sm">Está com fome?</h1>
              <h2 className="text-lg">
                Com apenas alguns cliques, encontre refeições acessíveis perto
                de você.
              </h2>
            </div>
            <Search onFilterChange={setFilter} filter={filter} />
          </div>
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
            <Button
              variant={"ghost"}
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
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
            <Button
              variant={"ghost"}
              className="h-fit p-0 text-primary hover:bg-transparent"
              onClick={() => router.push(`/restaurants`)}
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
}
