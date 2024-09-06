"use client";

import { trpc } from "@/app/_trpc/client";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import PokemonRow from "./PokemonRow";
import Pagination from "@mui/material/Pagination";

interface PokemonTableProps {
  name?: string[];
  type?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonTable: React.FC<PokemonTableProps> = ({ name, type }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const pokemonByNameQuery = trpc.getPokemonArray.useQuery(name || []);
  const pokemonByTypeQuery = trpc.getPokemonByType.useQuery(type || "");

  let data;
  const isLoading =
    pokemonByNameQuery.isLoading || pokemonByTypeQuery.isLoading;
  const error = pokemonByNameQuery.error || pokemonByTypeQuery.error;

  if (name && name.length > 0) {
    data = pokemonByNameQuery.data;
  } else if (type) {
    data = pokemonByTypeQuery.data;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {paginatedData.map((pokemon: Pokemon) => (
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

      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default PokemonTable;
