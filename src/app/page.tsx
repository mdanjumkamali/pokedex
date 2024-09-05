// import PokemonRow from "@/components/PokemonRow";
// import PokemonTable from "@/components/PokemonTable";

import FilterablePokedexTable from "@/components/PokemonTypeSelection";

export default function Home() {
  return (
    <div className="container m-10">
      <FilterablePokedexTable />
    </div>
  );
}
