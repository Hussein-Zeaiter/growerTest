import { useState } from "react";
import cartIcon from "../../../../../assets/product/icon-cart.svg";
import styles from "./CartButton.module.css";
import CartList from "../cartList/CartList";
import type { Item } from "../../../../../types/item";

interface CartButtonProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function CartButton(props: CartButtonProps) {
  const [cartVisi, setCartVisi] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.cartBtn}
        onClick={() => {
          setCartVisi(!cartVisi);
        }}
      >
        <img src={cartIcon} alt="cart" />
        {props.items.length > 0 && (
          <span className={styles.badge}>{props.items.length}</span>
        )}
      </button>

      {cartVisi && <CartList items={props.items} setItems={props.setItems} />}
    </div>
  );
}

export default CartButton;
