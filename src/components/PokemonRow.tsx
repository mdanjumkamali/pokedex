"use client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import PokemonCard from "./Card";

const PokemonRow = () => {
  const { data, isLoading, error } = trpc.getPokemon.useQuery("Butterfree");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const name = data?.name || "";
  const sprite = data?.sprite || "";
  const type = data?.types || [];

  return (
    <div>
      <PokemonCard name={name} sprite={sprite} type={type} />
    </div>
  );
};

export default PokemonRow;
