import React, { useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const res = await axios.get(`https://googleapis.com{query || 'fast'}&maxResults=6`);
      setBooks(res.data.items || []);
    }
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search for 'fast'..." 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={searchBooks}
        />
        <button onClick={searchBooks}>🔍</button>
      </div>
      <div className="book-grid">
        {books.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};
export default Home;