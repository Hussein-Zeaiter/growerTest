import Header from "../components/product/header/header/Header";
<<<<<<< HEAD
import type { stockItem } from "../types/item";
import thumb from "../assets/product/image-product-1-thumbnail.jpg";
import fullImg from "../assets/product/image-product-1.jpg";
import thumb2 from "../assets/product/image-product-2-thumbnail.jpg";
import fullImg2 from "../assets/product/image-product-2.jpg";
import Description from "../components/product/description/Description";


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
    ],
  },
];

//todo
function Product() {

  return (
    <>
      <Header />
      <Description stockItem={dummyStockItems[0]} setItems={setItems} />
    </>
  );
=======

function Product() {
  return <Header />;
>>>>>>> 751d0c4c523bb30f7d772386ae7898e3a222fab1
}

export default Product;
