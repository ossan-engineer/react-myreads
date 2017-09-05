import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './BookShelf.css';

const BookShelf = (props) => {
  const { title, category, books, handleChange } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.filter(book => book.category === category)
            .map(book => (
              <li>
                <Book {...book} handleChange={handleChange} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookShelf;
