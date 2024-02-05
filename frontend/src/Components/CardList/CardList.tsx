import Card from "../Card/Card";
import { CompanySearch } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { SyntheticEvent } from "react";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardList = ({ searchResults, onPortfolioCreate }: Props) => {
  return (
    <>
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((result) => (
            <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate} symbol={result.symbol} />
          ))}
        </div>
      ) : (
        <h1>No Results</h1>
      )}
    </>
  );
};

export default CardList;
