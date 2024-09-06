"use client";
import PokemonTable from "@/components/PokemonTable";
import PokemonTypeSelection from "@/components/PokemonTypeSelection";
import Search from "@/components/Search";
import { useState } from "react";
import AllPokemons from "./AllPokemons";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const handleChange = (query: string) => {
    const words = query
      .trim()
      .split(/\s+/)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
    setSearchQuery(words);
  };
  const handleType = (type: string) => {
    setSelectedType(type!);
  };
  return (
    <div>
      <h1 className="text-center my-4 text-4xl font-semibold">Pokedex</h1>
      <div className="max-w-screen-xl mx-4 md:mx-auto my-8 flex items-center justify-center">
        <Search onSearch={handleChange} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start md:px-20">
        <div>
          <PokemonTypeSelection onChange={handleType} />
        </div>
        <div className="px-6 md:px-0 pb-3">
          {searchQuery.length > 0 || selectedType ? (
            <PokemonTable name={searchQuery} type={selectedType!} />
          ) : (
            <AllPokemons />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
