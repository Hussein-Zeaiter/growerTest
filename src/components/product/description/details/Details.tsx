import type { stockItem } from "../../../../types/item";

import style from "./Details.module.css";

function Details({ stockItem }: { stockItem: stockItem }) {
  return (
    <div>
      <p className={style.company}>sneaker company</p>
      <h1 className={style.title}>{stockItem.title}</h1>
      <p className={style.description}>{stockItem.description}</p>

      {stockItem.discount > 0 ? (
        <>
          <p className={style.discount}>
            $
            {(stockItem.originalPrice * (1 - stockItem.discount / 100)).toFixed(
              2
            )}
            <span className={style.discountBox}>{stockItem.discount}%</span>
          </p>

          <p className={style.priceDiscounted}>
            ${stockItem.originalPrice.toFixed(2)}
          </p>
        </>
      ) : (
        <p className={style.price}>${stockItem.originalPrice.toFixed(2)}</p>
      )}
    </div>
  );
  //todo
  //what if there is not discount ????? also calculate the discount here raye7 the stock item thing!!!!
}

export default Details;
