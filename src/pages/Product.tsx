import Header from "../components/product/header/header/Header";
import type { Item } from "../types/item";
import { useState } from "react";
import thumb from "../assets/product/image-product-1-thumbnail.jpg";

const dummyItems: Array<Item> = [
  {
    id: 1,
    img: thumb,
    title: "Fall Limited Edition Sneakers",
    qt: 2,
    price: 125.0,
  },
  {
    id: 2,
    img: thumb,
    title: "Orange Summer Sandals",
    qt: 1,
    price: 89.99,
  },
];

//todo
function Product() {
  const [items, setItems] = useState<Array<Item>>(dummyItems);

  return <Header items={items} setItems={setItems} />;
}

export default Product;
