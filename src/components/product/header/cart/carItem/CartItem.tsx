import type { Item } from "../../../../../types/item";
import deleteIcon from "../../../../../assets/product/icon-delete.svg";
import styles from "./CartItem.module.css";
import { useCart } from "../../../../../stores/itemsContext/useCart";

function CartItem({ item }: { item: Item }) {
  const { setItems } = useCart();

  const handleDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <li>
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
