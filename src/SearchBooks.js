import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import './SearchBooks.css';

class SearchBooks extends Component {
  componentDidMount() {
    this.props.handleSearch();
  }

  render() {
    const { searchedBooks, handleChange, handleSearch, query } = this.props;

    console.log(searchedBooks);

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
              value={query}
            />

          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {searchedBooks.length > 0 ? searchedBooks.map(searchedBook => (
              <li key={searchedBook.id}>
                <Book {...searchedBook} handleChange={handleChange} />
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
  searchedBooks: [],
};

SearchBooks.propTypes = {
  searchedBooks: PropTypes.arrayOf(PropTypes.shape({
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
  query: PropTypes.string.isRequired,
};

export default SearchBooks;
