import { SyntheticEvent, useState } from "react";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./interfaces";
import { searchCompanies } from "./Apis/StockApi";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    const result = await searchCompanies(search);
    if(typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data);
    }

    console.log(searchResults);
  };

  const onPortfolioCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className='App'>
      <Search search={search} onSearchSubmit={onSearchSubmit} handleSearchChange={handleSearchChange}/>
      {serverError && <p>{serverError}</p>}
      <CardList searchResults={searchResults} onPortfolioCreate={onPortfolioCreate} />
    </div>
  );
}

export default App;
