"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState();
  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(searchQuery);
  };
  return (
    <Box
      component="form"
      sx={{
        width: { xs: "100%", sm: "75%", md: "80%" },
        display: "flex",
        alignItems: "center",
        border: "1px solid #4285F4",
        borderRadius: "5px",
        overflow: "hidden",
        paddingY: "5px",
        paddingRight: "8px",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Pokemon name or number or type"
        size="small"
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#4285F4" }} />
            </InputAdornment>
          ),
          sx: {
            border: "none",
            "& fieldset": {
              border: "none",
            },
          },
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          height: "40px",
          width: "100px",
          borderRadius: "5px",
          backgroundColor: "#FFD700",
          color: "#000",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FFC107",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default Search;
