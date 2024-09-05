"use client";

import React from "react";
import { trpc } from "@/app/_trpc/client";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const PokemonTypeSelection = () => {
  const [selectedType, setSelectedType] = React.useState<string | "">("");

  const { data: types, isLoading } = trpc.getAllTypes.useQuery();

  const handleChange = (event: SelectChangeEvent<string | "">) => {
    setSelectedType(event.target.value);
    console.log(selectedType);
  };

  if (isLoading) return <div>Loading...</div>;

  const handleReset = () => {
    setSelectedType("");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl
        variant="outlined" // Use 'outlined' to match the style in the screenshot
        sx={{
          m: 1,
          minWidth: 300,
          borderColor: "#4285F4",
          borderRadius: "5px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#4285F4",
            },
          },
        }}
      >
        <InputLabel id="type-select-label" sx={{ color: "#4285F4" }}>
          Type
        </InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {types?.map((typeName) => (
            <MenuItem key={typeName.name} value={typeName.name}>
              {typeName.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFD700", // Gold color
            color: "#000", // Black text
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FFC107",
            },
            width: "100px",
          }}
        >
          Apply
        </Button>
        <Button
          variant="text"
          sx={{
            color: "#4285F4",
            textTransform: "none",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default PokemonTypeSelection;
