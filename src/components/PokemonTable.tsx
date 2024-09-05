"use client";

import { trpc } from "@/app/_trpc/client";
import { Grid } from "@mui/material";
import React from "react";
import PokemonRow from "./PokemonRow";

interface PokemonTableProps {
  name?: string[];
  type?: string;
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonTable: React.FC<PokemonTableProps> = ({ name, type }) => {
  let data, isLoading, error;

  if (name && name.length > 0) {
    const result = trpc.getPokemonArray.useQuery(name);
    data = result.data;
    isLoading = result.isLoading;
    error = result.error;
  } else if (type) {
    const result = trpc.getPokemonByType.useQuery(type);
    data = result.data;
    isLoading = result.isLoading;
    error = result.error;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <Grid container spacing={2}>
      {data.map((pokemon: Pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
          <PokemonRow
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.types}
            sprite={pokemon.sprite}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonTable;
