import type { stockItem, Item } from "../../../types/item";
import Details from "./details/Details";
import Button from "../button/Button";
import { useState } from "react";

import style from "./Description.module.css";
import Counter from "./counter/Counter";

interface DescriptionProps {
  stockItem: stockItem;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

//todo: handling adding to cart thro set items
//todo: handling counter

function Description({ stockItem, setItems }: DescriptionProps) {
  const [count, setCount] = useState<number>(0);

  const handleAdd = () => {
    if (count > 0) {
      setItems((prev) => {
        const newId = prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1;

        const newItem: Item = {
          id: newId, // unique cart entry id
          stockId: stockItem.id, // reference to stock item
          img: stockItem.images[0].thumbnail,
          title: stockItem.title,
          qt: count,
          price: stockItem.discountedPrice,
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
