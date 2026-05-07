// Header.js
import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => (
  <header style={{ background: '#2c3e50', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1 style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/'}>BookFinder</h1>
    <SearchBar onSearch={onSearch} />
  </header>
);
export default Header;