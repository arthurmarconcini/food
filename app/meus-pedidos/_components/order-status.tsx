import { OrderStatus as OrderStatusType } from "@prisma/client";

interface OrderStatusProps {
  status: OrderStatusType;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  let message = "";

  switch (status) {
    case "CONFIRMED":
      message = "Confirmado";
      break;
    case "DELIVERING":
      message = "Em transporte";
      break;
    default:
      message = "Finalizado";
      break;
  }

  return (
    <div className="flex">
      <h1
        className={` rounded-full px-2 py-0.5 text-xs font-semibold text-white ${status === "CONFIRMED" ? "bg-[#5DC05B]" : "bg-red-500"}`}
      >
        {message}
      </h1>
    </div>
  );
};

export default OrderStatus;
