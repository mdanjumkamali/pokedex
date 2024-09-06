"use client";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery!);
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
        placeholder="Enter one or more Pokémon names"
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
