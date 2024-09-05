"use client";

import React from "react";
import { Grid } from "@mui/material";
import { trpc } from "@/app/_trpc/client";
import PokemonCard from "./Card";

const PokemonTable = () => {
  const { data, isLoading, error } = trpc.getPokemonArray.useQuery([
    "Wartortle",
    "Squirtle",
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container spacing={0}>
      {data?.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
          <PokemonCard
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
