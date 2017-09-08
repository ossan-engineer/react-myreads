import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './BookShelf.css';

const BookShelf = (props) => {
  const { title, shelf, books, handleChange } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.filter(book => book.shelf === shelf)
            .map(book => (
              <li key={book.id}>
                <Book {...book} handleChange={handleChange} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

BookShelf.defaultProps = {
  books: [],
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
      smallThumbnail: PropTypes.string,
    }),
  })),
  handleChange: PropTypes.func.isRequired,
};

export default BookShelf;
