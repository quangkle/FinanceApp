import React, { ChangeEvent, SyntheticEvent } from "react";

type Props = {
  search: string;
  onSearchSubmit: (e: SyntheticEvent) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, onSearchSubmit, handleSearchChange }: Props) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <input value={search} onChange={handleSearchChange} />
    </form>
  );
};

export default Search;
