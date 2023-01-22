import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
import CartContext from "../Context/cart-context";
const HeaderCartButton = (props) => {
  const ctxCart = useContext(CartContext);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    setBump(true);
    setTimeout(() => {
      setBump(false);
    }, 300);
  }, [ctxCart.cartSize]);
  return (
    <button
      onClick={ctxCart.showCart.function}
      className={`${styles.button} ${bump && styles.bump} ${props.className}`}
    >
      <div className={styles.icon}>
        <CartIcon></CartIcon>
      </div>
      <div>Your Cart</div>
      <div className={styles.badge}>{ctxCart.cartSize}</div>
    </button>
  );
};

export default HeaderCartButton;
