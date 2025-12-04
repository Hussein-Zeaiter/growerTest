import type { stockItem } from "../../../../types/item";

import style from "./Details.module.css";

function Details({ stockItem }: { stockItem: stockItem }) {
  return (
    <div>
      <p className={style.company}>sneaker company</p>
      <h1 className={style.title}>{stockItem.title}</h1>
      <p className={style.description}>{stockItem.description}</p>

      <p className={style.discount}>
        ${stockItem.discountedPrice.toFixed(2)}
        <span className={style.discountBox}>{stockItem.discount}%</span>
      </p>

      <p className={style.price}>${stockItem.originalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Details;
