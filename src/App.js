import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Home from './Home';
import SearchBooks from './SearchBooks';
import NoMatch from './NoMatch';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myBooks: [],
      searchedBooks: [],
      query: '',
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
    if (event) {
      this.setState({
        query: event.target.value,
      });
    }

    if (this.state.query.length > 0) {
      BooksAPI.search(this.state.query).then((data) => {
        const newData = Object.assign({}, data); // eslint-disable-line no-unused-vars

        this.setState({
          searchedBooks: Array.isArray(data) ? data : [],
        });
      });
    } else {
      this.setState({
        searchedBooks: [],
      });
    }
  };

  render() {
    return (
      <div className='app'>
        <Switch>
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
                query={this.state.query}
              />
            )}
          />
          <Route
            component={NoMatch}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
