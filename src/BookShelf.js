import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './BookShelf.css';

const BookShelf = (props) => {
  const { title, shelf, myBooks, handleChange } = props;

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {myBooks.filter(myBook => myBook.shelf === shelf)
            .map(myBook => (
              <li key={myBook.id}>
                <Book {...myBook} handleChange={handleChange} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
};

BookShelf.defaultProps = {
  myBooks: [],
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  myBooks: PropTypes.arrayOf(PropTypes.shape({
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
