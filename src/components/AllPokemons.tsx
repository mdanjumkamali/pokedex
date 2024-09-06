"use clinet";

import { trpc } from "@/app/_trpc/client";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PokemonRow from "./PokemonRow";
import { useState } from "react";
import { Pokemon } from "./PokemonTable";

const AllPokemons = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, error } = trpc.getAllPokemon.useQuery();

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

export default AllPokemons;
