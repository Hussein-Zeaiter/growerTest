import Header from "../../components/product/header/header/Header";
import ImageDisplayer from "../../components/product/gallery/ImageDisplayer";
import Description from "../../components/product/description/Description";
import type { stockItem } from "../../types/item";
import thumb from "../../assets/product/image-product-1-thumbnail.jpg";
import fullImg from "../../assets/product/image-product-1.jpg";
import thumb2 from "../../assets/product/image-product-2-thumbnail.jpg";
import fullImg2 from "../../assets/product/image-product-2.jpg";
import thumb3 from "../../assets/product/image-product-3-thumbnail.jpg";
import fullImg3 from "../../assets/product/image-product-3.jpg";
import thumb4 from "../../assets/product/image-product-4-thumbnail.jpg";
import fullImg4 from "../../assets/product/image-product-4.jpg";

import style from "./Product.module.css";

const dummyStockItems: stockItem[] = [
  {
    id: 1,
    title: "Fall Limited Edition Sneakers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl eget viverra ultrices, nunc nisi aliquet nisi, euismod aliquam nisl nisl.",
    originalPrice: 250.0,
    discount: 50,
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
        full: fullImg3,
        thumbnail: thumb3,
      },
      {
        full: fullImg4,
        thumbnail: thumb4,
      },
    ],
  },
];

function Product() {
  return (
    <>
      <Header />
      <div className={style.main}>
        <ImageDisplayer stockItem={dummyStockItems[0]} />
        <Description stockItem={dummyStockItems[0]} />
      </div>
    </>
  );
}

export default Product;
