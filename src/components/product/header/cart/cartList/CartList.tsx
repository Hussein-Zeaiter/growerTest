import styles from "./CartList.module.css";
import type { Item } from "../../../../../types/item";
import Button from "../../../button/Button";
import CartItem from "../carItem/CartItem";

interface CartListProps {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}

function CartList({ items, setItems }: CartListProps) {
  return (
    <div className={styles.list}>
      <h3>Cart</h3>

      {items.length === 0 ? (
        <div className={styles.contentEmpty}>
          <p>Your Cart Is Empty</p>
        </div>
      ) : (
        <>
          <div className={styles.content}>
            <ul>
              {items.map((item) => {
                return (
                  <CartItem item={item} setItems={setItems} key={item.id} />
                );
              })}
            </ul>
          </div>
          <Button type="checkout" />
        </>
      )}
    </div>
  );
}

export default CartList;
