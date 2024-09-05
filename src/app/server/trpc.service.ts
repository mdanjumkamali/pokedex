import { z } from "zod";
import { prismaClient } from "../client";
import { Pokemon as PrismaPokemon } from "@prisma/client";

// Schema Definitions
export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  sprite: z.string(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export const AddPokemonInputSchema = z.object({
  name: z.string(),
  sprite: z.string(),
  types: z.array(z.string()),
});

// Pokemon Service
export const pokemonService = {
  async getPokemon(name: string): Promise<Pokemon> {
    const pokemon = await prismaClient.pokemon.findUnique({
      where: { name },
      include: { types: true },
    });

    if (!pokemon) throw new Error("Pokemon not found");

    return this.formatPokemon(pokemon);
  },

  async getPokemonArray(names: string[]): Promise<Pokemon[]> {
    const pokemons = await prismaClient.pokemon.findMany({
      where: { name: { in: names } },
      include: { types: true },
    });

    return pokemons.map(this.formatPokemon);
  },

  async getPokemonByType(typeName: string): Promise<Pokemon[]> {
    const pokemons = await prismaClient.pokemon.findMany({
      where: {
        types: {
          some: { name: typeName },
        },
      },
      include: { types: true },
    });

    return pokemons.map(this.formatPokemon);
  },

  async addPokemon(
    input: z.infer<typeof AddPokemonInputSchema>
  ): Promise<Pokemon> {
    const typeRecords = await Promise.all(
      input.types.map((typeName) =>
        prismaClient.type.upsert({
          where: { name: typeName },
          update: {},
          create: { name: typeName },
        })
      )
    );

    const pokemon = await prismaClient.pokemon.create({
      data: {
        name: input.name,
        sprite: input.sprite,
        types: {
          connect: typeRecords.map((type) => ({ id: type.id })),
        },
      },
      include: { types: true },
    });

    return this.formatPokemon(pokemon);
  },

  formatPokemon(
    pokemon: PrismaPokemon & { types: { name: string }[] }
  ): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((type) => type.name),
      sprite: pokemon.sprite,
    };
  },
};
