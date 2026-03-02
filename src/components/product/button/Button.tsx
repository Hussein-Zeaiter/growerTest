import type { JSX } from "react";
import cart from "../../../assets/product/icon-cart.svg";
import styles from "./Button.module.css";

type ButtonType = "checkout" | "add";

const BUTTON_CONTENT: Record<ButtonType, JSX.Element> = {
  add: (
    <>
      <img src={cart} alt="cart" />
      Add to Cart
    </>
  ),

  checkout: <>Checkout</>,
};

function Button({ type }: { type: ButtonType }) {
  return <button className={styles.pButton}>{BUTTON_CONTENT[type]}</button>;
}

export default Button;
