import { useContext } from "react";
import { CartContext } from "./cartContext";

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider />");
  }

  return ctx;
  //this will give the items and setItems deconstruct it to use it, like this y3ne : const { items, setItems } = useCart();
}
