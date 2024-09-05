"use client";

import React from "react";
import { trpc } from "@/app/_trpc/client";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const PokemonTypeSelection = () => {
  const [selectedType, setSelectedType] = React.useState<string | "">("");

  const { data: types, isLoading } = trpc.getAllTypes.useQuery();

  const handleChange = (event: SelectChangeEvent<string | "">) => {
    setSelectedType(event.target.value);
    console.log(selectedType);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="type-select-label">Filter</InputLabel>
      <Select
        labelId="type-select-label"
        id="type-select"
        value={selectedType}
        onChange={handleChange}
        label="Filter"
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
  );
};

export default PokemonTypeSelection;
