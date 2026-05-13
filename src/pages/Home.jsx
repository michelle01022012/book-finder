import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";
import { useSearchParams } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleSearch = (term) => {
    setSearchParams({ q: term });
  };

  // 1. Define sortBooks first
  const sortBooks = useCallback((booksToSort, sortOption) => {
    const sorted = [...booksToSort];
    switch (sortOption) {
      case "title-asc":
        return sorted.sort((a, b) => (a.volumeInfo.title || "").localeCompare(b.volumeInfo.title || ""));
      case "title-desc":
        return sorted.sort((a, b) => (b.volumeInfo.title || "").localeCompare(a.volumeInfo.title || ""));
      default:
        return sorted;
    }
  }, []);

  // 2. Define handleSort after sortBooks
  const handleSort = useCallback(
    (sortOption) => {
      setSortBy(sortOption);
      setSortedBooks(sortBooks(books, sortOption));
    },
    [books, sortBooks],
  );

  // 3. Define fetchBooks before the useEffect that triggers it
  const fetchBooks = useCallback(
    async (query) => {
      try {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: query, maxResults: 6, key: API_KEY }
        });
        setBooks(res.data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    },
    [] // Removed API_KEY from dependencies as it is an external constant
  );

  // 4. Hook that calls fetchBooks now sits below the definition
  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query, fetchBooks]);

  // 5. Hook that synchronizes sorting
  useEffect(() => {
    setSortedBooks(sortBooks(books, sortBy));
  }, [books, sortBy, sortBooks]);

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
