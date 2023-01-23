import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import CartContext from "../Context/cart-context";
import useHttp from "../../hooks/use-http";
import axios from 'axios'
import {
  Stack,
  Typography,
  Pagination,
  Grid,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";

const AvailableMeals = (props) => {
  const ctxCart = useContext(CartContext);
  const [meals, setMeals] = useState(props.meals);
  let showMeals = [];
  const [searchedMeal, setSearchedMeal] = useState(undefined);
  const [categories, setCategories] = useState(props.categories);
  const [activeCategories, setActiveCategories] = useState(
    ctxCart.updateMeals ? [ctxCart.updateMeals] : []
  );
  const [page, setPage] = React.useState(1);
  const updateShowMeals = (respond) => {
    const temp = respond ? respond : meals ? meals : [];
    if (activeCategories.length !== 0) {
      const filterMealsName = temp.filter((item) => {
        for (const category of activeCategories) {
          if (searchedMeal) {
            if (
              item.category === category &&
              (item.name.toLowerCase().includes(searchedMeal.toLowerCase()))
            ) {
              return true;
            }
            if (searchedMeal && activeCategories.length === 1) {
              if ( item.name.toLowerCase().includes(searchedMeal.toLowerCase())) {
                return true;
              }
            }
          } else if (item.category === category) {
            return true;
          }
        }
        return false;
      });
      const filterMealsCategory = temp.filter((item) => {
        for (const category of activeCategories) {
          if (searchedMeal) {
            if (
              item.category === category &&
              (item.category.toLowerCase().includes(searchedMeal.toLowerCase()))
            ) {
              return true;
            }
            if (searchedMeal && activeCategories.length === 1) {
              if ( item.category.toLowerCase().includes(searchedMeal.toLowerCase())) {
                return true;
              }
            }
          } 
        }
        return false;
      });

      showMeals = [...filterMealsName,...filterMealsCategory];
    } else {
      
      showMeals = meals;
    }
  };
  updateShowMeals();
  const extractMeals = useCallback((data) => {
    let mealsData = [];
    console.log(data);
    for (const mealKey in data) {
      if (mealKey > 0) {
        mealsData.push({
          id: data[mealKey].id,
          name: data[mealKey].name,
          description: data[mealKey].description,
          price: data[mealKey].price,
          category: data[mealKey].category,
          serving: data[mealKey].serving,
        });
      }
    }
    console.log(mealsData);
    setMeals(mealsData);
    setPage(1);
    let temp = [];
    mealsData.map((item) => {
      if (!temp.includes(item.category)) {
        temp.push(item.category);
      }
      if (ctxCart.updateMeals && !temp.includes(ctxCart.updateMeals)) {
        temp.push(ctxCart.updateMeals);
      }
      setCategories(temp);
    });
    return mealsData;
  },[ctxCart.updateMeals]);

  // const { isLoading, error, sendRequest } = useHttp(
  //   "https://nat-development-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
  // );
  const { isLoading, error, sendRequest } = useHttp("/api/products");
  // useEffect(() => {
  //   sendRequest(undefined, extractMeals);
  // }, []);
 

  if(ctxCart.isLoading !== isLoading){
    ctxCart.setLoading(isLoading);
  }

  const updateCart = (getItem) => {
    const objMeal = { item: getItem.meal, amount: +getItem.amount };
    ctxCart.updateCart("ADD", objMeal);
  };

  useEffect(() => {
    const updateMeals = ctxCart.updateMeals;
    if (updateMeals) {
      console.log("search for", ctxCart.updateMeals);
      sendRequest(
        undefined,
        extractMeals,
        `/api/products/${ctxCart.updateMeals}`
      );

      setCategories((prev) => [
        updateMeals,
        ...prev.filter((option) => option !== searchedMeal),
      ]);
      setActiveCategories((prev) => [
        updateMeals,
        ...prev.filter((option) => option !== searchedMeal),
      ]);
      setSearchedMeal(updateMeals);
    }
  }, [ctxCart.updateMeals,sendRequest]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <MealsSummary />
      <Card className={styles.meals}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={categories ? categories :[]}
          getOptionLabel={(option) => option}
          value={activeCategories}
          onChange={(event, newValue) => {
            setPage(1);
            if (ctxCart.updateMeals && newValue[0] != ctxCart.updateMeals) {
              ctxCart.setUpdateMeals(undefined);
              setSearchedMeal(undefined);
              setCategories([]);
              sendRequest(undefined, extractMeals);
            }
            setActiveCategories((prev) => [...newValue]);
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
              key={index}
                label={option}
                {...getTagProps({ index })}
                // disabled={fixedOptions.indexOf(option) !== -1}
              />
            ))
          }
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter Meals"
              placeholder="categories"
            />
          )}
        />
        <ul>
          {showMeals
            .filter((meal, index) => {
              return index >= (page - 1) * 10 && index < (page - 1) * 10 + 10;
            })
            .map((meal) => {
              return (
                <MealItem
                  onAddToCart={updateCart}
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  meal={meal}
                  category={meal.category}
                />
              );
            })}
          {showMeals.length === 0 && !isLoading && !error && <p>{`No products found with your description:${searchedMeal}`} </p>}
          {isLoading && <p className={styles.center}>Is loading...</p>}
          {error && (
            <p className={styles["text-error"]}>
              Something went wrong when fetching the data: {error}
            </p>
          )}
        </ul>
      </Card>
      <Grid container justifyContent="center">
        <Grid item sx={{marginBottom:'1em'}}>
          <Stack spacing={2}>
            {page && <Typography align="center">Page: {page}</Typography>}
            <Pagination
              count={Math.ceil(showMeals.length / 10)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};


  export async function getStaticProps() {

    const data = await axios.get('/api/products');
    let mealsData = [];
      console.log(data);
      for (const mealKey in data) {
        if (mealKey > 0) {
          mealsData.push({
            id: data[mealKey].id,
            name: data[mealKey].name,
            description: data[mealKey].description,
            price: data[mealKey].price,
            category: data[mealKey].category,
            serving: data[mealKey].serving,
          });
        }
      }
 
      let temp = [];
      mealsData.map((item) => {
        if (!temp.includes(item.category)) {
          temp.push(item.category);
        }
      
      });
   


    return {
        props: {
           meals:mealsData,
           categories:temp
        },
        revalidate:100,
       
    };
}


export default AvailableMeals;
