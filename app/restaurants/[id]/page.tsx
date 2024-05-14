import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const transformedRestaurant = {
    ...restaurant,
    deliveryFee: restaurant!.deliveryFee.toNumber(),
    products: restaurant!.products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    })),
  };

  return (
    <div>
      <RestaurantImage restaurant={transformedRestaurant} />
      <RestaurantDetails restaurant={transformedRestaurant} />
    </div>
  );
};

export default RestaurantPage;
