import React, { SyntheticEvent } from "react";

type Props = {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
};

const DeletePortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button>X</button>
      </form>
    </div>
  );
};

export default DeletePortfolio;
