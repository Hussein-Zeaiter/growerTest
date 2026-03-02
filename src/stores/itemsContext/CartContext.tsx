import { createContext } from "react";
import type { Item } from "../../types/item";

export type CartContextType = {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
};

export const CartContext = createContext<CartContextType | null>(null);
