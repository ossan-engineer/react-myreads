import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Home from './Home';
import SearchBooks from './SearchBooks';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  handleGetAll = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data,
      });
    });
  };

  handleChange = (event, id) => {
    const newBooks = this.state.books.map(book => Object.assign({}, book));
    const shelf = event.target.value;

    newBooks.forEach((newBook) => {
      if (newBook.id === id) {
        newBook.shelf = shelf; // eslint-disable-line no-param-reassign
      }
    });

    this.setState({
      books: newBooks,
    }, () => {
      BooksAPI.update(id, shelf);
    });
  };

  handleSearch = (event) => {
    if (!event || !event.target.value) {
      this.setState({
        books: [],
      });
      return;
    }

    BooksAPI.search(event.target.value).then(data => this.setState({
      books: Array.isArray(data) ? data : [],
    }));
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <Home
              books={this.state.books}
              handleChange={this.handleChange}
              handleGetAll={this.handleGetAll}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              books={this.state.books}
              handleChange={this.handleChange}
              handleSearch={this.handleSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
