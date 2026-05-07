import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const info = book.volumeInfo;
  return (
    <div className="book-card">
      <img src={info.imageLinks?.thumbnail} alt={info.title} />
      <h3>{info.title}</h3>
      <Link to={`/book/${book.id}`} className="view-btn">View Details</Link>
    </div>
  );
};
export default BookCard;