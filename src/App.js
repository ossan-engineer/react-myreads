import React from 'react';
// import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  handleAdd = () => {
    this.setState({ showSearchPage: true });
  };

  handleCloseSearch = () => {
    this.setState({ showSearchPage: false });
  };

  render() {
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          <SearchBooks onCloseSearch={this.handleCloseSearch} />
        ) : (
          <div className='list-books'>
            <ListBooksTitle title='MyReads' />
            <div className='list-books-content'>
              <div>
                <BookShelf title='Currently Reading' />
                <BookShelf title='Want to Read' />
                <BookShelf title='Read' />
              </div>
            </div>
            <OpenSearch onAdd={this.handleAdd} />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
