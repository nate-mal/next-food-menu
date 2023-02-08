import React, { useContext } from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Image from "next/image";
import Search from "./Search";
import CartContext from "../Context/cart-context";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";
const Header = () => {
  const ctxCart = useContext(CartContext);

  const handleSearch = (searchValue) => {
    ctxCart.setUpdateMeals(searchValue);
  };

  return (
    <>
      {ctxCart.isLoading && (
        <Box style={{ position: "fixed", width: "100%",zIndex:1001 }}>
          <LinearProgress />
        </Box>
      )}
      <header className={styles.header}>
        <Search onSearch={handleSearch} />
        <HeaderCartButton className={styles["header__button"]} />
      </header>
      <div className={styles["main-image"]}>
        <Image src="/meals.jpg" alt="meals" width="925" height="250" />
      </div>
    </>
  );
};

export default Header;
