import { prismaClient } from "../client";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  // single Pokémon
  getPokemon: publicProcedure.input(z.string()).query(async ({ input }) => {
    const pokemon = await prismaClient.pokemon.findUnique({
      where: { name: input },
      include: { types: true },
    });

    if (!pokemon) throw new Error("Pokemon not found");

    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((type) => type.name),
      sprite: pokemon.sprite,
    };
  }),

  // multiple Pokémon

  getPokemonArray: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const pokemons = await prismaClient.pokemon.findMany({
        where: { name: { in: input } },
        include: { types: true },
      });

      return pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.name),
        sprite: pokemon.sprite,
      }));
    }),

  // Pokémon filtered by type

  getPokemonByType: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const pokemons = await prismaClient.pokemon.findMany({
        where: {
          types: {
            some: {
              name: input,
            },
          },
        },
        include: { types: true },
      });

      return pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.name),
        sprite: pokemon.sprite,
      }));
    }),
});

export type AppRouter = typeof appRouter;
