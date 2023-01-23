import React, { useReducer, useEffect, useState, useCallback } from "react";

const CartContext = React.createContext([
  {
    item: {
      id: "m2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
    },
    amount: 1,
  },
]);
const reducer = (state, action) => {
  if (action.type === "ADD") {
    let alreadyinCart = false;
    let updatedState;
    if (state.length > 0) {
      updatedState = state.map((cartItem) => {
        if (cartItem.item.id === action.value.item.id) {
          const updatedAmount = cartItem.amount + action.value.amount;
          alreadyinCart = true;
          return { item: cartItem.item, amount: updatedAmount };
        } else return cartItem;
      });
    }
    if (alreadyinCart) return updatedState;
    else return [...state, action.value];
  } else if (action.type === "IN/DECREASE_AMOUNT") {
    const updatedState = state
      .map((cartItem, key, state) => {
        if (cartItem.item.id === action.value.id) {
          const updatedAmount = cartItem.amount + action.value.amount;
          if (updatedAmount > 0)
            return { item: cartItem.item, amount: updatedAmount };
          else return "removed";
        } else return cartItem;
      })
      .filter((cartItem) => {
        return cartItem !== "removed";
      });
    return updatedState;
  } else if (action.type === "REMOVE") {
    return state.filter((cartItem) => {
      return cartItem.item.id !== action.value.id;
    });
  } else if (action.type === "CLEAN") {
    return [];
  }
};
export const CartContextProvider = (props) => {
  const [cartContent, dispatchCartContext] = useReducer(reducer, []);
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart((prevState) => !prevState);
  };

  const getCartSize = useCallback(() => {
    const temp = cartContent;
    return temp.reduce((total, cartItem) => +total + cartItem.amount, 0);
  }, [cartContent]);
  const getCartCost = useCallback(() => {
    const temp = cartContent;
    if (cartContent) {
      return temp.reduce(
        (total, cartItem) => +total + cartItem.item.price * cartItem.amount,
        0
      );
    }
  }, [cartContent]);
  const [cartSize, setCartSize] = useState(getCartSize);
  const [cartCost, setCartCost] = useState(getCartCost);
  useEffect(() => {
    setCartSize(getCartSize());
  }, [setCartSize, getCartSize]);
  useEffect(() => {
    setCartCost(getCartCost());
  }, [setCartCost, getCartCost]);
  const updateCartHandler = (actionType, value) => {
    dispatchCartContext({ type: actionType, value: value });
  };
  const [updateMeals, setUpdateMeals] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  return (
    <CartContext.Provider
      value={{
        cartContent: cartContent,
        updateCart: updateCartHandler,
        cartSize: cartSize,
        showCart: { function: showCartHandler, value: showCart },
        cartCost,
        updateMeals,
        setUpdateMeals,
        isLoading,
        setLoading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
