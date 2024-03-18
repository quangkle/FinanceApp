import React, { SyntheticEvent } from "react";
import { PortfolioGetResponse } from "../../../Models/Portfolio";

type Props = {
  portfolioValue: PortfolioGetResponse;
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const DeletePortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue.symbol} />
        <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          X
        </button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
