import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css'; // Import the CSS file for styling

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      setError('Failed to delete the book. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">Library Booklist</h1>
      <Link to="/add" className="add-book-link">
        Add New Book
      </Link>
      {books.length === 0 ? (
        <p className="no-books-message">No books found. Add a new book!</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">by {book.author}</p>
                <p className="book-year">Published in {book.publishedYear}</p>
              </div>
              <div className="book-actions">
                <Link to={`/edit/${book._id}`} className="edit-button">
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(book._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const BookList = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     const response = await axios.get('http://localhost:5000/api/books');
//     setBooks(response.data);
//   };

//   const deleteBook = async (id) => {
//     await axios.delete(`http://localhost:5000/api/books/${id}`);
//     fetchBooks();
//   };

//   return (
//     <div>
//       <h1>Library Booklist</h1>
//       <Link to="/add">Add Book</Link>
//       <ul>
//         {books.map((book) => (
//           <li key={book._id}>
//             {book.title} by {book.author} ({book.publishedYear})
//             <Link to={`/edit/${book._id}`}>Edit</Link>
//             <button onClick={() => deleteBook(book._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookList;