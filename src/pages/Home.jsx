import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

  const fetchBooks = async (query = 'fast') => {
    const res = await axios.get(`https://googleapis.com{query}&maxResults=6&key=${API_KEY}`);
    setBooks(res.data.items || []);
  };

  useEffect(() => { fetchBooks(); }, []);

  return (
    <div className="home-page">
      <SearchBar onSearch={fetchBooks} />
      <div className="book-grid">
        {books.map(book => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
};
export default Home;