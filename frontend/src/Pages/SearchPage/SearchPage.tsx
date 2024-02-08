import React, { SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../Apis/StockApi";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../interfaces";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data);
    }

    console.log(searchResults);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();

    const updatedPortfolioValues = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolioValues);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();

    const updatedPortfolioValues = portfolioValues.filter((item) => {
      return item !== e.target[0].value;
    });
    setPortfolioValues(updatedPortfolioValues);
  };

  return (
    <div className="App">
      <Search
        search={search}
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleSearchChange}
      />

      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />

      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
        onPortfolioDelete={onPortfolioDelete}
      />
    </div>
  );
};

export default SearchPage;
