import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import OrderStatus from "./_components/order-status";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../_components/ui/button";
import { formatCurrency } from "../_helpers/price";

const MeusPedidos = async () => {
  const data = await getServerSession(authOptions);

  const orders = await db.order.findMany({
    where: {
      userId: data?.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!data)
    return (
      <div>
        <h1>Nao ah um usuario</h1>
      </div>
    );

  return (
    <div>
      <Header />
      <div className="container mx-auto mb-5">
        <h1 className="mb-3 text-lg font-semibold">Meus pedidos</h1>
        <div className="flex flex-col gap-3 ">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col gap-2 border-b border-[#eeeeee] pb-3 ">
                <OrderStatus status={order.status} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="relative size-4">
                      <Image
                        src={order.restaurant.imageUrl}
                        alt={order.restaurant.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-full"
                      />
                    </div>
                    <h1 className="text-sm font-semibold">
                      {order.restaurant.name}
                    </h1>
                  </div>
                  <Link href={`/restaurantes/${order.restaurant.id}`}>
                    <ChevronRight height={16} width={16} />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b border-[#eeeeee] py-3 ">
                <div className="flex flex-col gap-1.5">
                  {order.products.map(({ product }, index) => (
                    <div key={product.id} className="flex items-center gap-2">
                      <div className="item flex size-[18px] items-center justify-center rounded-full bg-muted-foreground text-xs text-white">
                        {index + 1}
                      </div>

                      <h2 className="text-xs text-muted-foreground">
                        {product.name}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs">
                  {formatCurrency(Number(order.totalPrice))}
                </span>
                <Button
                  disabled={order.status !== "COMPLETED"}
                  className="h-auto text-xs font-semibold text-primary"
                  variant={"ghost"}
                >
                  Adicionar a sacola
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeusPedidos;
