import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';

const Book = (props) => {
  const {
    id,
    title,
    authors,
    imageLinks,
    shelf,
    handleChange,
  } = props;

  return (
    <div className='book'>
      <div className='book-top'>
        <img
          src={imageLinks.thumbnail}
          className='book-cover'
          alt={`${id}: ${title} - ${authors.toString()}`}
        />
        <div className='book-shelf-changer'>
          <select value={shelf} onChange={(event) => handleChange(event, id)}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors.toString()}</div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Book;
