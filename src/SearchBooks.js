import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import './SearchBooks.css';

class SearchBooks extends Component {
  componentDidMount() {
    this.props.handleSearch();
  }

  componentWillReceiveProps(nextProps) {
    // TODO: Sync shelves between Home and SearchBooks
  }

  render() {
    const { books, handleChange, handleSearch } = this.props;

    console.log(books);

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            to='/'
            className='close-search'
          />
          <div className='search-books-input-wrapper'>
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={handleSearch}
            />

          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {books.length > 0 ? books.map(book => (
              <li key={book.id}>
                <Book {...book} handleChange={handleChange} />
              </li>
            )) : null
            }
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.defaultProps = {
  books: [],
};

SearchBooks.propTypes = {
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
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBooks;
