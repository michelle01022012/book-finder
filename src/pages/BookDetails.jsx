import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

  useEffect(() => {
    axios.get(`https://googleapis.com{id}?key=${API_KEY}`)
      .then(res => setBook(res.data));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const { volumeInfo } = book;
  const rating = volumeInfo.averageRating || 0;

  return (
    <div className="details-container" style={{ backgroundColor: '#f0f4f8' }}>
      <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
      <h1>{volumeInfo.title}</h1>
      <div className="stars">{'★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))}</div>
      <p>Cost: {book.saleInfo?.listPrice?.amount || 'N/A'} {book.saleInfo?.listPrice?.currencyCode}</p>
      <p>{volumeInfo.description}</p>
    </div>
  );
};
export default BookDetails;