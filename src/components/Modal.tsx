import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export interface ModalProps {
  children?: ReactNode;
  open: boolean;
  onOpenChange(open: boolean): void;
  className?: string;
  closeButton?: boolean;
}

export function Modal({
  children,
  open,
  onOpenChange,
  closeButton,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("max-w-[480px] w-full", className)}
        closeButton={closeButton}
      >
        <DialogTitle className="sr-only">Dialog</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
