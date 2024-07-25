import { CheckIcon, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { CartContext } from "../_providers/cart";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import createOrder from "../_actions/order";
import { Button } from "./ui/button";

interface FinishOrderButtonProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const FinishOrderButton = ({ isOpen, setIsOpen }: FinishOrderButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmeDialogOpen, setIsConfirmeDialogOpen] = useState(false);

  const { products, total, subtotal, totalDiscount, clearCart } =
    useContext(CartContext);
  const { data } = useSession();

  const handleConfirm = () => {
    if (!data?.user) {
      return;
    }

    const restaurant = products[0]?.restaurant;

    try {
      setIsSubmitting(true);

      createOrder({
        user: {
          connect: {
            id: data.user.id,
          },
        },
        deliveryFee: restaurant?.deliveryFee,
        deliveryTimeMinutes: restaurant?.deliveryTimeMinutes,
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        status: "CONFIRMED",
        subtotalPrice: subtotal,
        totalDiscounts: totalDiscount,
        totalPrice: total,
      });

      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);

      setIsConfirmeDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isConfirmeDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsConfirmeDialogOpen(true)}>
          Finalizar pedido
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-3/4 rounded-md bg-[#ffffff]">
        <AlertDialogHeader className="flex items-center">
          <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-primary">
            <CheckIcon
              width={28}
              height={28}
              className=" font-bold text-white"
            />
          </div>

          <AlertDialogTitle>Pedido Efetuado!</AlertDialogTitle>
          <AlertDialogDescription>
            Seu pedido foi realizado com sucesso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsConfirmeDialogOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishOrderButton;
