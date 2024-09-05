import PokemonRow from "@/components/PokemonRow";
// import PokemonTable from "@/components/PokemonTable";

import FilterablePokedexTable from "@/components/PokemonTypeSelection";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div>
      <div className="max-w-screen-xl mx-4 md:mx-auto my-8 flex items-center justify-center">
        <Search />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start  h-screen ">
        <div className="">
          <FilterablePokedexTable />
        </div>
        <div className="border w-full">
          <PokemonRow />
        </div>
      </div>
    </div>
  );
}
