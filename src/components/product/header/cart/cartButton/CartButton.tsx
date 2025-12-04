import { useState } from "react";
import cartIcon from "../../../../../assets/product/icon-cart.svg";
import styles from "./CartButton.module.css";
import CartList from "../cartList/CartList";
import type { Item } from "../../../../../types/item";

interface CartButtonProps {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}

function CartButton({ items, setItems }: CartButtonProps) {
  const [isDropdownVisible, setisDropdownVisible] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.cartBtn}
        onClick={() => {
          setisDropdownVisible(!isDropdownVisible);
        }}
      >
        <img src={cartIcon} alt="cart" />
        {items.length > 0 && (
          <span className={styles.badge}>{items.length}</span>
        )}
      </button>

      {isDropdownVisible && <CartList items={items} setItems={setItems} />}
    </div>
  );
}

export default CartButton;
