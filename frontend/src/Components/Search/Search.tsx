import React, { ChangeEvent } from "react";

type Props = {
  search: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, onClick, handleChange }: Props) => {
  return (
    <div>
      <input value={search} onChange={handleChange} />
      <button onClick={onClick} />
    </div>
  );
};

export default Search;
