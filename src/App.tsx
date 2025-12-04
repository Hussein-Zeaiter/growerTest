import "./App.css";
import Product from "./pages/Product";
import { CartProvider } from "./stores/itemsContext/CartProvider";
import type { Item } from "./types/item";
import thumb from "./assets/product/image-product-1-thumbnail.jpg";

const dummyItems: Array<Item> = [
  {
    id: 1,
    stockId: 1,
    img: thumb,
    title: "Fall Limited Edition Sneakers",
    qt: 2,
    price: 125.0,
  },
  {
    id: 2,
    stockId: 1,
    img: thumb,
    title: "Orange Summer Sandals",
    qt: 1,
    price: 89.99,
  },
];

function App() {
  return (
    <CartProvider initialItems={dummyItems}>
      <Product />
    </CartProvider>
  );
}

export default App;
