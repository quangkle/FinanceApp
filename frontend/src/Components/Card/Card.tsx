import { SyntheticEvent } from "react";
import { CompanySearch } from "../../interfaces";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import "./Card.css";

type Props = {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
  symbol: string;
};

const Card = ({ id, searchResult, onPortfolioCreate, symbol }: Props) => {
  return (
    <div className="card">
      <img src="" alt="company logo" />
      <div className="details">
        <h2>{searchResult.name} ({searchResult.symbol})</h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="info">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={symbol} />
    </div>
  );
};

export default Card;