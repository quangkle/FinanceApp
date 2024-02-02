import React, { useState } from "react";

type Props = {};

const Search = (props: Props) => {
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e);
    }

    return (
        <div>
            <input value={search} onChange={(e) => handleChange(e)} />
            <button onClick={(e) => onClick(e)} />
        </div>
    );
};

export default Search;
