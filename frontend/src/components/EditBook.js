import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBook.css'; // Import the CSS file for styling

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishedYear(response.data.publishedYear);
    } catch (error) {
      setError('Failed to fetch book details. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !publishedYear) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, {
        title,
        author,
        publishedYear,
      });
      navigate('/');
    } catch (error) {
      setError('Failed to update the book. Please try again.');
    }
  };

  return (
    <div className="edit-book-container">
      <h1 className="edit-book-title">Edit Book</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-book-form">
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
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;