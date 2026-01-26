import { useState, useRef, useEffect } from "react";
import cartIcon from "../../../../../assets/product/icon-cart.svg";
import styles from "./CartButton.module.css";
import CartList from "../cartList/CartList";
import { useCart } from "../../../../../stores/itemsContext/useCart";

function CartButton() {
  const { items } = useCart();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.cartBtn}
        onClick={() => setIsDropdownVisible((v) => !v)}
      >
        <img src={cartIcon} alt="cart" />
        {items.length > 0 && (
          <span className={styles.badge}>
            {items.length > 99 ? "99+" : items.length}
          </span>
        )}
      </button>

      {isDropdownVisible && <CartList />}
    </div>
  );
}

export default CartButton;
