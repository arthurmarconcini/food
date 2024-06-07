import { Card } from "./ui/card";

const CartDetails = () => {
  return (
    <Card className="bg-background">
      <div className="not-last-child-border-b flex flex-col p-5">
        <div className="flex items-center justify-between pb-2 text-xs">
          <p className="text-muted-foreground">Subtotal</p>
          <p>R$ 35,00</p>
        </div>
        <div className="flex items-center justify-between py-2 text-xs">
          <p className="text-muted-foreground">Entrega</p>
          <p className="text-primary">GRATIS</p>
        </div>
        <div className="flex items-center justify-between py-2 text-xs">
          <p className="text-muted-foreground">Descontos</p>
          <p>-R$ 3,50</p>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm font-semibold">
          <p>Total</p>
          <p>R$ 31,50</p>
        </div>
      </div>
    </Card>
  );
};

export default CartDetails;
