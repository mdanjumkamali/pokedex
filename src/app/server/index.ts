import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { pokemonService } from "./trpc.service";

export const appRouter = router({
  // all pokemon
  getAllTypes: publicProcedure.query(async () => {
    return await pokemonService.getAllTypes();
  }),

  // single Pokémon
  getPokemon: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await pokemonService.getPokemon(input);
  }),

  // multiple Pokémon

  getPokemonArray: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      return await pokemonService.getPokemonArray(input);
    }),

  // Pokémon filtered by type

  getPokemonByType: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await pokemonService.getPokemonByType(input);
    }),

  // add pokemon
  addPokemon: publicProcedure
    .input(
      z.object({
        name: z.string(),
        sprite: z.string(),
        types: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      return await pokemonService.addPokemon(input);
    }),
});

export type AppRouter = typeof appRouter;
