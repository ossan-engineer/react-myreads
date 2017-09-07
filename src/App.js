import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import * as SHELVES from './constants/shelves';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
      });
    });
  }

  handleChange = (event, id) => {
    const newBooks = this.state.books.map(book => Object.assign({}, book));
    const shelf = event.target.value;

    newBooks.forEach((newBook) => {
      if (newBook.id === id) {
        newBook.shelf = shelf;
      }
    });

    this.setState({
      books: newBooks,
    }, () => {
      BooksAPI.update(id, shelf);
    });
  };

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
                  <BookShelf
                    title='Currently Reading'
                    shelf={SHELVES.CURRENTLY_READING}
                    books={this.state.books}
                    handleChange={this.handleChange}
                  />
                  <BookShelf
                    title='Want to Read'
                    shelf={SHELVES.WANT_TO_READ}
                    books={this.state.books}
                    handleChange={this.handleChange}
                  />
                  <BookShelf
                    title='Read'
                    shelf={SHELVES.READ}
                    books={this.state.books}
                    handleChange={this.handleChange}
                  />
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

export default App;
