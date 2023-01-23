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
  const [hasOrder, setHasOrder] = useState(false);
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
    );showCheckout
  };
  const getActions = () => {
    return (
      <div className={styles.actions} style={{marginTop:'auto'}}>
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
      <Modal onBlur={ctxCart.showCart.function} >
        <Card className={styles.cart} style={{height:'90vh',display:'flex',flexDirection:'column'}} >
          <ul className={styles["cart-items"]}>
            {ctxCart.cartContent.length > 0 ? (
              getCartItems()
            ) : (
              <h1 style={{marginTop:'30vh'}} className={styles.empty__message}>{hasOrder ? "Your order is on the way":" Your cart is empty!"}</h1>
            )}
          </ul>
          <div style={{marginTop:'auto'}}>
          <h1 style={{marginTop:'auto'}} className={styles.total}>{`Total: $${ctxCart.cartCost.toFixed(
            2
          )}`}</h1>
          {getActions()}
          </div>
        </Card>
      </Modal>
      {showCheckout && (
        <Checkout
          onCancel={() => {
            setShowCheckout(false);
          }}
          onSuccess={()=>{setHasOrder(true)}}
        />
      )}
    </>
  );
};

export default Cart;
