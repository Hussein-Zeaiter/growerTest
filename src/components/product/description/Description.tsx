import type { stockItem, Item } from "../../../types/item";
import Details from "./details/Details";
import Button from "../button/Button";
import { useState } from "react";
import style from "./Description.module.css";
import Counter from "./counter/Counter";
import { useCart } from "../../../stores/itemsContext/useCart";

interface DescriptionProps {
  stockItem: stockItem;
}

function Description({ stockItem }: DescriptionProps) {
  const [count, setCount] = useState<number>(0);
  const { setItems } = useCart();

  const handleAdd = () => {
    if (count > 0) {
      setItems((prev) => {
        const newId = prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1;
        const priceAfterDiscount =
          stockItem.originalPrice * (1 - stockItem.discount / 100);

        const newItem: Item = {
          id: newId, // unique cart entry id
          stockId: stockItem.id, // reference to stock item
          img: stockItem.images[0].thumbnail,
          title: stockItem.title,
          qt: count,
          price: priceAfterDiscount,
        };
        return [...prev, newItem];
      });

      setCount(0);
    }
  };

  return (
    <div className={style.main}>
      <Details stockItem={stockItem} />
      <div className={style.controlsCont}>
        <Counter count={count} setCount={setCount} />
        <Button type="add" onClick={handleAdd} />
      </div>
    </div>
  );
}

export default Description;
