import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_KEY;
 

  const fetchBooks = useCallback(async (query = 'fast') => {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6&key=${API_KEY}`
    );

    setBooks(res.data.items || []);
  } catch (error) {
    console.error('Error fetching books:', error);
    setBooks([]);
  }
}, [API_KEY]);

  useEffect(() => { 
     fetchBooks(); 
  }, [fetchBooks]);

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