"use client";

import { Restaurant } from "@prisma/client";

import RestaurantItem from "./restaurant-item";
import { useEffect, useState } from "react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const res = await fetch("/api/restaurants");
      const data = await res.json();
      setRestaurants(data);
    }

    fetchRestaurants();
  }, []);

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 xl:px-0 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
