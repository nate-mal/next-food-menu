import React, { useState } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";
const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);
  const inputChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddToCart(amount);
  };
  return (
    <form
      onSubmit={submitHandler}
      className={`${styles.form} ${props.className}`}
    >
      <Input
        onChange={inputChangeHandler}
        label="Amount"
        input={{
          id: "amount",
          value: amount,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
