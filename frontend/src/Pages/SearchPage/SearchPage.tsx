import React, { SyntheticEvent, useEffect, useState } from "react";
import { searchCompanies } from "../../Apis/StockApi";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../interfaces";
import { PortfolioGetResponse } from "../../Models/Portfolio";
import {
  portfolioAddApi,
  portfolioDeleteApi,
  portfolioGetApi,
} from "../../Services/PortfolioService";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";

type Props = {};

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<
    PortfolioGetResponse[] | null
  >([]);
  const [serverError, setServerError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    getPortfolioList();
  }, []);
  
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

  const getPortfolioList = () => {
    portfolioGetApi(token ?? "")
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        toast.error("Could not get portfolio values!");
      });
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();

    portfolioAddApi(e.target[0].value, token ?? "")
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Stock added to portfolio!");
          getPortfolioList();
        }
      })
      .catch((e) => {
        toast.error("Could not add portfolio!");
      });
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();

    portfolioDeleteApi(e.target[0].value, token ?? "")
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Stock removed from portfolio!");
          getPortfolioList();
        }
      })
      .catch((e) => {
        toast.error("Could not remove stock from portfolio!");
      });
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
