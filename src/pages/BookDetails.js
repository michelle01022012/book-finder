import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`https://googleapis.com{id}`)
      .then(res => setBook(res.data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const info = book.volumeInfo;
  return (
    <div className="details-page" style={{ backgroundColor: '#f0f4f8' }}>
      <img src={info.imageLinks?.large || info.imageLinks?.thumbnail} alt={info.title} />
      <h1>{info.title}</h1>
      <div className="stars">{"⭐".repeat(Math.floor(info.averageRating || 0))}</div>
      <p>Cost: {book.saleInfo?.listPrice?.amount || "N/A"} {book.saleInfo?.listPrice?.currencyCode}</p>
      <p dangerouslySetInnerHTML={{ __html: info.description }}></p>
    </div>
  );
};
export default BookDetails;