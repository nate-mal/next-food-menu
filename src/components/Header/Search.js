import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { TextField } from "@mui/material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const SearchField = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Search>
      <Grid container>
        <Grid item>
          <IconButton onClick={() => onSearch(searchValue)}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <InputBase
            placeholder="Search…"
            value={searchValue}
            inputProps={{
              "aria-label": "search",
            }}
            onChange={(event) => setSearchValue(event.target.value)}
            sx={(theme) => ({
              color: "inherit",
              "& .MuiInputBase-input": {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create("width"),
                width: "100%",
                [theme.breakpoints.up("sm")]: {
                  width: "12ch",
                  "&:focus": {
                    width: "20ch",
                  },
                },
              },
            })}
          />
        </Grid>
      </Grid>
    </Search>
  );
};

export default SearchField;
