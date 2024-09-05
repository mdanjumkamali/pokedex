"use client";
import React from "react";
import { trpc } from "@/app/_trpc/client";

const PokemonRow = () => {
  const { data, isLoading, error } = trpc.getPokemon.useQuery("Wartortle");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default PokemonRow;
