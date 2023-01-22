import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../Context/cart-context";
const CartItem = (props) => {
  const ctxCart = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const updateItemHandler = () => {
    const updateAmount = (amount) => {
      ctxCart.updateCart("IN/DECREASE_AMOUNT", {
        id: props.id,
        amount: amount,
      });
    };
    const removeItem = () => {
      ctxCart.updateCart("REMOVE", {
        id: props.id,
      });
    };
    return {
      increment: () => {
        updateAmount(1);
      },
      decrement: () => {
        updateAmount(-1);
      },
      remove: () => {
        removeItem();
      },
    };
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={updateItemHandler().decrement}>−</button>
        <button onClick={updateItemHandler().increment}>+</button>
        <button onClick={updateItemHandler().remove}>X</button>
      </div>
    </li>
  );
};

export default CartItem;
