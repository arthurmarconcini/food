import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const calculateProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.price),
    };
  }

  const totalDiscount =
    Number(product.price) * (product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.price) - totalDiscount,
  };
};

export const formatCurrency = (price: number): string => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(price);
};
