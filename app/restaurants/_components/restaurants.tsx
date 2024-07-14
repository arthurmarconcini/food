"use client";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import Search from "@/app/_components/search";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const searchFor = searchParams?.get("q") || "";

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filter, setFilter] = useState<string>(searchFor);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  );

  const onFilterChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetch("/api/restaurants");
      const data = await res.json();
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(filter.toLowerCase());
    });

    setFilteredRestaurants(filtered);
  }, [filter, restaurants]);

  return (
    <div className="mb-10">
      <Header />
      <div className="container mx-auto">
        <Search filter={filter} onFilterChange={onFilterChange} />
      </div>
      <div></div>

      {filteredRestaurants.length === 0 ? (
        <div className="container mx-auto mt-8">
          Nao existe nenhum restaurante com este nome!
        </div>
      ) : (
        <div className="container mx-auto mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
