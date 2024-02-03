import { useState } from "react";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./interfaces";
import { searchCompanies } from "./Apis/StockApi";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const result = await searchCompanies(search);
    if(typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data);
    }

    console.log(searchResults);
  };

  return (
    <div className='App'>
      <Search search={search} onClick={onClick} handleChange={handleChange}/>
      {serverError && <p>{serverError}</p>}
      <CardList searchResults={searchResults} />
    </div>
  );
}

export default App;
