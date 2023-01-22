import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../Context/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
  const ctxCart = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const getCartItems = () => {
    return (
      <>
        {ctxCart.cartContent.map((cartItem) => {
          return (
            <CartItem
              id={cartItem.item.id}
              key={cartItem.item.id}
              name={cartItem.item.name}
              price={cartItem.item.price * cartItem.amount}
              amount={cartItem.amount}
            />
          );
        })}
      </>
    );
  };
  const getActions = () => {
    return (
      <div className={styles.actions}>
        <button
          onClick={ctxCart.showCart.function}
          type="button"
          className={styles["button--alt"]}
        >
          CLose
        </button>
        {ctxCart.cartContent.length > 0 && (
          <button
            onClick={() => {
              console.log("Ordering...");
              setShowCheckout(true);
            }}
            type="button"
            className={styles.button}
          >
            Order
          </button>
        )}
      </div>
    );
  };
  return (
    <>
      <Modal onBlur={ctxCart.showCart.function}>
        <Card className={styles.cart}>
          <ul className={styles["cart-items"]}>
            {ctxCart.cartContent.length > 0 ? (
              getCartItems()
            ) : (
              <h1 className={styles.empty__message}>Your cart is empty!</h1>
            )}
          </ul>
          <h1 className={styles.total}>{`Total: ${ctxCart.cartCost.toFixed(
            2
          )}`}</h1>
          {getActions()}
        </Card>
      </Modal>
      {showCheckout && (
        <Checkout
          onCancel={() => {
            setShowCheckout(false);
          }}
        />
      )}
    </>
  );
};

export default Cart;
