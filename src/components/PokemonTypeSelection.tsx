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
  SelectChangeEvent,
} from "@mui/material";

interface PokemonTypeSelectionProps {
  onChange: (type: string) => void;
}

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  onChange,
}) => {
  const [selectedType, setSelectedType] = React.useState<string>("");

  const { data: types } = trpc.getAllTypes.useQuery();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newType = event.target.value;
    setSelectedType(newType);
  };

  const handleApply = () => {
    onChange(selectedType);
  };

  const handleReset = () => {
    setSelectedType("");
    onChange("");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl
        variant="outlined"
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
            backgroundColor: "#FFD700",
            color: "#000",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FFC107",
            },
            width: "100px",
          }}
          onClick={handleApply}
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
