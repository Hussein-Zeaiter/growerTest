import styles from "./CartList.module.css";
import Button from "../../../button/Button";
import CartItem from "../carItem/CartItem";
import { useCart } from "../../../../../stores/itemsContext/useCart";

function CartList() {
  const { items } = useCart();

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
                return <CartItem item={item} key={item.id} />;
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
