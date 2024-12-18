import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode } from "react";

export function Modalbox({
  btncss,
  title,
  descrip,
  children,
  btnIcon,
  btnText,
  isOpen = false,
  variant = "default",
  size = "default",
}: {
  btncss?: string;
  btnText?: string;
  descrip?: string;
  title: string;
  children: ReactNode;
  btnIcon?: ReactNode;
  isOpen?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}) {
  return (
    <Dialog defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={btncss}>
          {btnIcon}
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{descrip}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
