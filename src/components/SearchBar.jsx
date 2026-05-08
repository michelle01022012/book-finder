import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ onSearch, onSort }) => {
  const [term, setTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const handleAction = () => term && onSearch(term);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    onSort(sortValue);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search books..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAction()}
      />
      <button onClick={handleAction} className="search--button">
        <IoIosSearch size={25} />
      </button>
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="sort-dropdown"
      >
        <option value="relevance">Relevance</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
      </select>
    </div>
  );
};
export default SearchBar;