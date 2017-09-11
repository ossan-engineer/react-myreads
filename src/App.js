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
      myBooks: [],
      searchedBooks: [],
    };
  }

  handleGetAll = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        myBooks: data,
      });
    });
  };

  handleChange = (event, id) => {
    const newBooks = this.state.myBooks.map(book => Object.assign({}, book));
    const shelf = event.target.value;

    newBooks.forEach((newBook) => {
      if (newBook.id === id) {
        newBook.shelf = shelf; // eslint-disable-line no-param-reassign
      }
    });

    this.setState({
      myBooks: newBooks,
    }, () => {
      BooksAPI.update(id, shelf);
    });
  };

  handleSearch = (event) => {
    if (!event || !event.target.value) {
      this.setState({
        searchedBooks: [],
      });
      return;
    }

    BooksAPI.search(event.target.value).then(data => this.setState({
      searchedBooks: Array.isArray(data) ? data : [],
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
              myBooks={this.state.myBooks}
              handleChange={this.handleChange}
              handleGetAll={this.handleGetAll}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              searchedBooks={this.state.searchedBooks}
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
