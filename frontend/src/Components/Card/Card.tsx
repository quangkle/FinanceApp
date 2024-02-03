import { CompanySearch } from "../../interfaces";
import "./Card.css";

type Props = {
  id: string;
  searchResult: CompanySearch;
};

const Card = ({ id, searchResult }: Props) => {
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
    </div>
  );
};

export default Card;