import type { Item } from "../../../../../types/item";
import deleteIcon from "../../../../../assets/product/icon-delete.svg";
import styles from "./CartItem.module.css";
import type React from "react";

function CartItem({
  item,
  setItems,
}: {
  item: Item;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <li key={item.id}>
      <img src={item.img} className={styles.itemImg} alt="" />
      <div className={styles.desc}>
        <p>{item.title}</p>
        <p>
          ${item.price} x {item.qt} <span>${item.price * item.qt}</span>
        </p>
      </div>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <img src={deleteIcon} alt="" />
      </button>
    </li>
  );
}

export default CartItem;
