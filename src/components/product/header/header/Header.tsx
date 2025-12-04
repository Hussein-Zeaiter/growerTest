import Logo from "../../../../assets/product/logo.svg";
import Avatar from "../../../../assets/product/image-avatar.png";
import CartButton from "../cart/cartButton/CartButton";
import type { Item } from "../../../../types/item";
import styles from "./header.module.css";

function Header({
  items,
  setItems,
}: {
  items: Array<Item>;
  setItems: React.Dispatch<React.SetStateAction<Array<Item>>>;
}) {
  return (
    <header>
      <div className={styles.subCont}>
        <img src={Logo} alt="Business Logo" />

        <nav>
          <a href="#">Collections</a>
          <a href="#">Men</a>
          <a href="">Women</a>
          <a href="">About</a>
          <a href="">Contact</a>
        </nav>
      </div>

      <div className={styles.subCont}>
        <CartButton items={items} setItems={setItems} />

        <img className={styles.avatar} src={Avatar} alt="Profile" />
      </div>
    </header>
  );
}

export default Header;
