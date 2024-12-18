import { ICartItem } from "@/redux/features/cartSlice/cartSlice";

export const cartItemCalculation = (
  cartItems: ICartItem[],
  additionalDiscount: number = 0 // Default additional discount to 0
) => {
  // Helper function to round numbers to two decimal places
  const roundToTwo = (value: number) => parseFloat(value.toFixed(2));

  // Calculate total price before any discount
  const totalPriceBeforeDiscount = cartItems.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0
  );

  // Calculate total item-level discounts
  const itemLevelDiscount = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.price * (item.discount / 100)),
    0
  );

  // Total price after item-level discounts
  const totalPrice = totalPriceBeforeDiscount - itemLevelDiscount;

  // Apply additional discount (percentage of the total price after item-level discounts)
  const additionalDiscountAmount = totalPrice * (additionalDiscount / 100);

  // Final subtotal after all discounts
  const subTotal = totalPrice - additionalDiscountAmount;

  // Total discount = item-level discounts + additional discount
  const totalDiscount = itemLevelDiscount + additionalDiscountAmount;

  return {
    totalPriceBeforeDiscount: roundToTwo(totalPriceBeforeDiscount),
    itemLevelDiscount: roundToTwo(itemLevelDiscount),
    additionalDiscount: roundToTwo(additionalDiscountAmount),
    totalDiscount: roundToTwo(totalDiscount),
    subTotal: roundToTwo(subTotal),
  };
};
