import type { JSX } from "react";
import cart from "../../../assets/product/icon-cart.svg";
import styles from "./Button.module.css";

type ButtonType = "checkout" | "add";

interface ButtonProps {
  type: ButtonType;
  onClick?: () => void;
}

const BUTTON_CONTENT: Record<ButtonType, JSX.Element> = {
  add: (
    <>
      <img src={cart} alt="cart" />
      Add to Cart
    </>
  ),

  checkout: <>Checkout</>,
};

function Button({ type, onClick }: ButtonProps) {
  return (
    <button className={styles.pButton} onClick={onClick}>
      {BUTTON_CONTENT[type]}
    </button>
  );
}

export default Button;
