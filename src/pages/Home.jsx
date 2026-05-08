import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const sortBooks = useCallback((booksToSort, sortOption) => {
    const sorted = [...booksToSort];
    switch (sortOption) {
      case "title-asc":
        return sorted.sort((a, b) =>
          (a.volumeInfo.title || "").localeCompare(b.volumeInfo.title || ""),
        );
      case "title-desc":
        return sorted.sort((a, b) =>
          (b.volumeInfo.title || "").localeCompare(a.volumeInfo.title || ""),
        );
      default:
        return sorted;
    }
  }, []);

  const handleSort = useCallback(
    (sortOption) => {
      setSortBy(sortOption);
      setSortedBooks(sortBooks(books, sortOption));
    },
    [books, sortBooks],
  );

  const fetchBooks = useCallback(
    async (query = "fast") => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6&key=${API_KEY}`,
        );

        setBooks(res.data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    },
    [API_KEY],
  );

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update sortedBooks whenever books or sortBy changes
  useEffect(() => {
    setSortedBooks(sortBooks(books, sortBy));
  }, [books, sortBy, sortBooks]);

  return (
    <div className="home-page">
      <SearchBar onSearch={fetchBooks} onSort={handleSort} />
      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
export default Home;
