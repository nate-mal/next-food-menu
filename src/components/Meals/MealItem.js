import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const AddToCartHandler = (amount) => {
    props.onAddToCart({ meal: props.meal, amount: amount });
  };

  return (
    <li className={styles.meal}>
      <div className={styles.meal__text}>
        <h3>{props.name}</h3>
        <span>Category: {props.category}</span>
        <span>Serving size: {props.meal.serving}</span>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{props.price}</div>
      </div>
      <MealItemForm
        onAddToCart={AddToCartHandler}
        className={styles.meal__form}
      />
    </li>
  );
};

export default MealItem;
