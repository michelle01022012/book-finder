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

  const handleSort = useCallback((sortOption) => {
    setSortBy(sortOption);
    setSortedBooks(sortBooks(books, sortOption));
  }, [books, sortBooks]);

  const fetchBooks = useCallback(async (searchQuery) => {
    try {
      const res = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: { q: searchQuery, maxResults: 6, key: API_KEY }
      });
      const items = res.data.items || [];
      setBooks(items);
      sessionStorage.setItem("last_search_query", searchQuery);
      sessionStorage.setItem("last_search_results", JSON.stringify(items));
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  }, []);

   useEffect(() => {
    const savedQuery = sessionStorage.getItem("last_search_query");
    const savedResults = sessionStorage.getItem("last_search_results");

    if (query) {
      fetchBooks(query);
    } else if (savedQuery && savedResults) {
      setSearchParams({ q: savedQuery }, { replace: true });
      setBooks(JSON.parse(savedResults));
    }
  }, [query, fetchBooks, setSearchParams]);

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
