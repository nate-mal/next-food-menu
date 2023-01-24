import React, { useContext } from "react";
import Head from "next/head";
import AvailableMeals from "@/components/Meals/AvailableMeals";
import CartContext from "../components/Context/cart-context";
import Cart from "@/components/Cart/Cart";
import  { getAllProducts } from "./api/products";
export default function Home(props) {
  const ctxCart = useContext(CartContext);
  console.log("cart ctx:");
  console.log(ctxCart);
  console.log(props.categories);
  return (
    <>
      <Head>
        <title>Food Menu</title>
        <meta name="description" content="Food order menu app" />
      </Head>
      {ctxCart.showCart.value && <Cart />}

      <AvailableMeals meals={props.meals} categories={props.categories} />
    </>
  );
}


export async function getStaticProps() {


 const data = await getAllProducts();

 console.log(data);
  let meals = data;
  let categories = [];

    
        // for (const mealKey in data ) {
        //   if (mealKey > 0) {
        //     meals.push({
        //       id: data[mealKey].id,
        //       name: data[mealKey].name,
        //       description: data[mealKey].description ? data[mealKey].description :'' ,
        //       price: data[mealKey].price,
        //       category: data[mealKey].category,
        //       serving: data[mealKey].serving,
        //     });
        //   }
        // }
        
    
        meals.map((item) => {
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
        
    


  
         console.log("categories",categories)
      

  
  return {
    props: {
       meals,
       categories
    },
    revalidate:100,  
};
}
