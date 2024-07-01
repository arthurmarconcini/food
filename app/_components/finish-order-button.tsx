import { CheckIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface FinishOrderButtonProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const FinishOrderButton = ({ isOpen, setIsOpen }: FinishOrderButtonProps) => {
  const handleConfirm = () => {
    setIsOpen();
  };

  return (
    <AlertDialog open={isOpen}>
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
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-[#F4F4F5] font-semibold text-[#323232]"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishOrderButton;
