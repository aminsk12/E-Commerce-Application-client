import { Button } from "@/components/ui/button";
import React from "react";
interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  isPending?: boolean;
}
const CButton = ({ type, text, isPending = false }: ButtonProps) => {
  return (
    <div>
      <Button disabled={isPending} type={type}>
        {isPending ? "Processing.." : text}
      </Button>
    </div>
  );
};

export default CButton;
