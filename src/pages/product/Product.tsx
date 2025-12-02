import Header from "../../components/product/header/header/Header";
import Gallery from "../../components/product/gallery/Gallery";
import Description from "../../components/product/description/Description";
import type { Item, stockItem } from "../../types/item";
import { useState } from "react";
import thumb from "../../assets/product/image-product-1-thumbnail.jpg";
import fullImg from "../../assets/product/image-product-1.jpg";
import thumb2 from "../../assets/product/image-product-2-thumbnail.jpg";
import fullImg2 from "../../assets/product/image-product-2.jpg";

import style from "./Product.module.css";

const dummyItems: Item[] = [
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

const dummyStockItems: stockItem[] = [
  {
    id: 1,
    title: "Fall Limited Edition Sneakers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget viverra ultrices, nunc nisi aliquet nisi, euismod aliquam nisl nisl.",
    originalPrice: 250.0,
    discount: 50,
    get discountedPrice() {
      return this.originalPrice * (1 - this.discount / 100);
    },
    images: [
      {
        full: fullImg,
        thumbnail: thumb,
      },
      {
        full: fullImg2,
        thumbnail: thumb2,
      },
      {
        full: fullImg2,
        thumbnail: thumb2,
      },
      {
        full: fullImg2,
        thumbnail: thumb2,
      },
    ],
  },
];

//todo
function Product() {
  const [items, setItems] = useState<Array<Item>>(dummyItems);

  return (
    <>
      <Header items={items} setItems={setItems} />
      <div className={style.main}>
        <Gallery stockItem={dummyStockItems[0]} />
        <Description stockItem={dummyStockItems[0]} setItems={setItems} />
      </div>
    </>
  );
}

export default Product;
