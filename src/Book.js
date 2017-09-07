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
          alt={`${id}: ${title} - ${authors.join(', ')}`}
        />
        <div className='book-shelf-changer'>
          <select value={shelf || 'none'} onChange={event => handleChange(event, id)}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      <div className='book-authors'>{authors.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    smallThumbnail: PropTypes.string.isRequired,
  }).isRequired,
  shelf: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Book;
