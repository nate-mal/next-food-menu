import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";
import styles_cart from "./Cart.module.css";
import CartContext from "../Context/cart-context";
import useHttp from "../../hooks/use-http";

const Checkout = (props) => {
  const { isLoading, error, sendRequest } = useHttp(
    "https://react-http-97ff1-default-rtdb.firebaseio.com/orders.json"
  );

  const ctxCart = useContext(CartContext);

  const {
    value: value_name,
    isValid: isValid_name,
    isInvalid: isInvalid_name,
    changeInputValue: changeInputValue_name,
    touchInputValue: touchInputValue_name,
  } = useInput((value) => {
    return value.trim() !== "";
  });
  const {
    value: value_email,
    isValid: isValid_email,
    isInvalid: isInvalid_email,
    changeInputValue: changeInputValue_email,
    touchInputValue: touchInputValue_email,
  } = useInput((value) => {
    return value.includes("@");
  });
  const formIsValid = isValid_name && isValid_email;
  const submitHandler = (e) => {
    e.preventDefault();
    touchInputValue_name();
    touchInputValue_email();
    if (!formIsValid) return;
    const body = {
      person: { name: value_name, email: value_email },
      order: ctxCart.cartContent,
    };
    sendRequest({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    ctxCart.updateCart("CLEAN");
    props.onCancel();
    console.log(ctxCart.cartContent);
    console.log(formIsValid);
  };
  const getAction = () => {
    return (
      <div className={styles_cart.actions}>
        <button
          type="button"
          onClick={props.onCancel}
          className={styles_cart["button--alt"]}
        >
          CLose
        </button>
        <button type="submit" className={styles_cart["button"]}>
          Send Order
        </button>
      </div>
    );
  };

  return (
    <Modal onBlur={props.onCancel}>
      <Card>
        <form onSubmit={submitHandler} className={styles["form-group"]}>
          <div
            className={`${styles["form-control"]} ${
              isInvalid_name && styles.invalid
            }`}
          >
            <label htmlFor="name">Your name</label>
            <input
              value={value_name}
              onChange={changeInputValue_name}
              onBlur={touchInputValue_name}
              id="name"
            />
            {isInvalid_name && (
              <p className={styles["error-text"]}>
                Name field cannot be empty! Please provide one
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${
              isInvalid_email && styles.invalid
            }`}
          >
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              value={value_email}
              onChange={changeInputValue_email}
              onBlur={touchInputValue_email}
            />
            {isInvalid_email && (
              <p className={styles["error-text"]}>
                Please provide a valid mail(a valid e-mail address should
                contain "@" character)
              </p>
            )}
          </div>

          {getAction()}
        </form>
      </Card>
    </Modal>
  );
};

export default Checkout;
