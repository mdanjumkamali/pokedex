"use client";
import PokemonTable from "@/components/PokemonTable";
import FilterablePokedexTable from "@/components/PokemonTypeSelection";
import Search from "@/components/Search";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const handleChange = (query: string) => {
    const words = query.trim().split(/\s+/);
    setSearchQuery(words);
  };
  const handleType = (type: string) => {
    setSelectedType(type!);
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-4 md:mx-auto my-8 flex items-center justify-center">
        <Search onSearch={handleChange} />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start  h-screen ">
        <div className="">
          <FilterablePokedexTable onChange={handleType} />
        </div>
        <div className="border w-full">
          <PokemonTable name={searchQuery} type={selectedType!} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
