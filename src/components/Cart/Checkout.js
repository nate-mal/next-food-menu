import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal/Modal";
import useInput from "../../hooks/use-input";
import styles from "./Checkout.module.css";
import styles_cart from "./Cart.module.css";
import CartContext from "../Context/cart-context";
import useHttp from "../../hooks/use-http";
import CircularProgress from '@mui/material/CircularProgress';

const Checkout = (props) => {
  const { isLoading, error, sendRequest } = useHttp(
    "/api/order"
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
    return  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)|| value.length===0;
  });
  const {
    value: value_address,
    isValid: isValid_address,
    isInvalid: isInvalid_address,
    changeInputValue: changeInputValue_address,
    touchInputValue: touchInputValue_address,
  } = useInput((value) => {
    return value.length > 3;
  });
  const {
    value: value_tel,
    isValid: isValid_tel,
    isInvalid: isInvalid_tel,
    changeInputValue: changeInputValue_tel,
    touchInputValue: touchInputValue_tel,
  } = useInput((value) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
  });
  const formIsValid = isValid_name && isValid_email  && isValid_address && isValid_tel;
  const submitHandler = async(e) => {
    e.preventDefault();
    touchInputValue_name();
    touchInputValue_email();
    touchInputValue_address();
    touchInputValue_tel();
    if (!formIsValid) return;
    const body = {
      person: { name: value_name, email: value_email, address:value_address, tel:value_tel },
      order: ctxCart.cartContent,
    };
    await sendRequest({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    props.onSuccess();
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
        <button  style={{width:'150px'}} loading={isLoading} type="submit" className={styles_cart["button"]}>
         { isLoading ? <CircularProgress size={20} />:"Send Order"}
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
            <label htmlFor="name">Your name:</label>
            <input
              value={value_name}
              onChange={changeInputValue_name}
              onBlur={touchInputValue_name}
              id="name"
            />
            {isInvalid_name && (
              <p className={styles["error-text"]}>
                Name field cannot be empty!<br/> Please provide one
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${ isInvalid_email && styles.invalid}`}
          >
            <label htmlFor="email">Your email(optional):</label>
            <input
              id="email"
              value={value_email}
              onChange={changeInputValue_email}
              onBlur={()=>{ if(value_email.length > 0)touchInputValue_email()}}
            />
            {isInvalid_email && (
              <p className={styles["error-text"]}>
                Please provide a valid e-mail or leave the field blank <br/>(a valid e-mail address should
                contain &quot@&quot character
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${
              isInvalid_address && styles.invalid
            }`}
          >
            <label htmlFor="address">Your address:</label>
            <input
              id="address"
              value={value_address}
              onChange={changeInputValue_address}
              onBlur={touchInputValue_address}
            />
            {isInvalid_address && (
              <p className={styles["error-text"]}>
                Please provide an  address <br/>(a valid  address should
                contain a street name and a number).
              </p>
            )}
          </div>
          <div
            className={`${styles["form-control"]} ${
              isInvalid_tel && styles.invalid
            }`}
          >
            <label htmlFor="tel">Your phone number:</label>
            <input
              id="tel"
              value={value_tel}
              onChange={changeInputValue_tel}
              onBlur={touchInputValue_tel}
            />
            {isInvalid_tel && (
              <p className={styles["error-text"]}>
                Please provide a valid phone number <br/>(a standard phone number should
                contain a at least 10 digits).
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
