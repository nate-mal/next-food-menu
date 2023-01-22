import React, { useContext, useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealsSummary from "./MealsSummary";
import MealItem from "./MealItem";
import CartContext from "../Context/cart-context";
import useHttp from "../../hooks/use-http";
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
  const [meals, setMeals] = useState([]);
  let showMeals = [];
  const [searchedMeal, setSearchedMeal] = useState(undefined);
  const [categorys, setCategorys] = useState([]);
  const [activeCategorys, setActiveCategorys] = useState(
    ctxCart.updateMeals ? [ctxCart.updateMeals] : []
  );
  const [page, setPage] = React.useState(1);
  const updateShowMeals = (respond) => {
    const temp = respond ? respond : meals;
    if (activeCategorys.length !== 0) {
      const filterMeals = temp.filter((item) => {
        for (const category of activeCategorys) {
          if (searchedMeal) {
            if (
              item.category === category &&
              item.name.includes(searchedMeal)
            ) {
              return true;
            }
            if (searchedMeal && activeCategorys.length === 1) {
              if (item.name.includes(searchedMeal)) {
                return true;
              }
            }
          } else if (item.category === category) {
            return true;
          }
        }
        return false;
      });

      showMeals = filterMeals;
    } else {
      showMeals = meals;
    }
  };
  updateShowMeals();
  const extractMeals = (data) => {
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
      setCategorys(temp);
    });
    return mealsData;
  };

  // const { isLoading, error, sendRequest } = useHttp(
  //   "https://nat-development-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
  // );
  const { isLoading, error, sendRequest } = useHttp("/api/products");
  useEffect(() => {
    sendRequest(undefined, extractMeals);
  }, [sendRequest]);
  useEffect(() => {
    ctxCart.setLoading(isLoading);
  }, [isLoading]);
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

      setCategorys((prev) => [
        updateMeals,
        ...prev.filter((option) => option !== searchedMeal),
      ]);
      setActiveCategorys((prev) => [
        updateMeals,
        ...prev.filter((option) => option !== searchedMeal),
      ]);
      setSearchedMeal(updateMeals);
    }
  }, [ctxCart.updateMeals]);

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
          options={categorys}
          getOptionLabel={(option) => option}
          value={activeCategorys}
          onChange={(event, newValue) => {
            setPage(1);
            if (ctxCart.updateMeals && newValue[0] != ctxCart.updateMeals) {
              ctxCart.setUpdateMeals(undefined);
              setSearchedMeal(undefined);
              sendRequest(undefined, extractMeals);
            }
            setActiveCategorys((prev) => [...newValue]);
          }}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
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
              placeholder="Categorys"
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
          {!meals && !isLoading && !error && <p>The menu list is empty</p>}
          {isLoading && <p className={styles.center}>Is loading...</p>}
          {error && (
            <p className={styles["text-error"]}>
              Something went wrong when fetching the data: {error}
            </p>
          )}
        </ul>
      </Card>
      <Grid container justifyContent="center">
        <Grid item>
          <Stack spacing={2}>
            {page && <Typography>Page: {page}</Typography>}
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

export default AvailableMeals;
