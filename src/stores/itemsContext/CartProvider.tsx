import { useState } from "react";
import type { ReactNode } from "react";
import type { Item } from "../../types/item";
import { CartContext } from "./cartContext";

type Props = {
  children: ReactNode;
  initialItems?: Array<Item>;
};

export const CartProvider = ({ children, initialItems = [] }: Props) => {
  const [items, setItems] = useState<Array<Item>>(initialItems);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
};
