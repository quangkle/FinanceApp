import Card from "../Card/Card";
import { CompanySearch } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: CompanySearch[];
}

const CardList = ({ searchResults }: Props) => {
  return (
    <>
      {searchResults.length > 0 ? (
        <div>
          {searchResults.map((result) => (
            <Card id={result.symbol} key={uuidv4()} searchResult={result} />
          ))}
        </div>
      ) : (
        <h1>No Results</h1>
      )}
    </>
  );
};

export default CardList;
