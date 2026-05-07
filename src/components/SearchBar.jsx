// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleAction = () => term && onSearch(term);

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search books..." 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAction()}
      />
      <button onClick={handleAction}>🔍</button>
    </div>
  );
};
export default SearchBar;