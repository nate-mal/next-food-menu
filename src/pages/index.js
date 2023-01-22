import React, { useContext } from "react";
import Head from "next/head";
import AvailableMeals from "@/components/Meals/AvailableMeals";
import CartContext from "../components/Context/cart-context";
import Cart from "@/components/Cart/Cart";
export default function Home() {
  const ctxCart = useContext(CartContext);
  console.log("cart ctx:");
  console.log(ctxCart);
  return (
    <>
      <Head>
        <title>Food Menu</title>
        <meta name="description" content="Food order menu app" />
      </Head>
      {ctxCart.showCart.value && <Cart />}

      <AvailableMeals />
    </>
  );
}
