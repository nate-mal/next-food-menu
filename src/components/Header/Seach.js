import React, { useState } from "react";
import ReactDOM from "react-dom";
import useHttp from "../../hooks/use-http";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const people = [
  "Siri",
  "Alexa",
  "Google",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Sinkedin",
];

function Search() {
  const { isLoading, error, sendRequest } = useHttp("/api/products");

  const def_items = [];
  const [items, setItems] = useState(def_items);
  const extractMealsSummery = (data) => {
    let mealsData = [];
    console.log(data);
    for (const mealKey in data) {
      if (mealKey > 0) {
        mealsData.push({
          id: mealKey,
          name: data[mealKey].name,
          price: data[mealKey].price,
        });
      }
    }
    console.log(mealsData);
    setItems(mealsData);
    return mealsData;
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
    if (string.length > 3) {
      sendRequest(undefined, extractMealsSummery, `/api/products/${string}`);
    }

    console.log("search");
    console.log(string);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          Price: {item.price}
        </span>
      </>
    );
  };

  return (
    <div style={{ width: "300px" }}>
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
      />
    </div>
  );
}

export default Search;
