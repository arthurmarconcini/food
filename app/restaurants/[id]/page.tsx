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
      categories: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <RestaurantDetails restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
