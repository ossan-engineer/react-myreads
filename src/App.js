import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import './App.css';

class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll();
  }

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <ListBooksTitle title='MyReads' />
              <div className='list-books-content'>
                <div>
                  <BookShelf title='Currently Reading' />
                  <BookShelf title='Want to Read' />
                  <BookShelf title='Read' />
                </div>
              </div>
              <OpenSearch />
            </div>
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
