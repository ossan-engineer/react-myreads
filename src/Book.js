import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';
import noImage from './assets/no-image.png';

const Book = (props) => {
  const {
    id,
    title,
    authors,
    imageLinks,
    shelf,
    handleChange,
  } = props;
  const authorsString = authors.length > 0 ? authors.join(', ') : '';

  return (
    <div className='book'>
      <div className='book-top'>
        <img
          src={imageLinks.thumbnail ? imageLinks.thumbnail : noImage}
          className='book-cover'
          alt={`${id}: ${title} - ${authorsString}`}
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
      <div className='book-authors'>{authorsString}</div>
    </div>
  );
};

Book.defaultProps = {
  shelf: 'none',
  authors: [],
  imageLinks: {},
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
    smallThumbnail: PropTypes.string,
  }),
  shelf: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Book;
