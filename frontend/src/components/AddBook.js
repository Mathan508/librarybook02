import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css'; // Import the CSS file for styling

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !publishedYear) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/books', {
        title,
        author,
        publishedYear,
      });
      navigate('/');
    } catch (error) {
      setError('Failed to add the book. Please try again.');
    }
  };

  return (
    <div className="add-book-container">
      <h1 className="add-book-title">Add a New Book</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            type="number"
            id="publishedYear"
            placeholder="Enter published year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddBook = () => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publishedYear, setPublishedYear] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('http://localhost:5000/api/books', {
//       title,
//       author,
//       publishedYear,
//     });
//     navigate('/');
//   };

//   return (
//     <div>
//       <h1>Add Book</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Published Year"
//           value={publishedYear}
//           onChange={(e) => setPublishedYear(e.target.value)}
//           required
//         />
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;