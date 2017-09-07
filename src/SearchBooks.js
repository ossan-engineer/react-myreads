import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './SearchBooks.css';

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  handleSearch = (event) => {
    this.setState({
      books: [],
    });

    BooksAPI.search(event.target.value).then(data => this.setState({
      books: data,
    }));
  };

  render() {
    const { handleChange } = this.props;

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
              onChange={this.handleSearch}
            />

          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book {...book} handleChange={handleChange} />
              </li>
            ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SearchBooks;
