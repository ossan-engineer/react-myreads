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
            <Home
              books={this.state.books}
              handleChange={this.handleChange}
            />
          )}
        />
        <Route
          path='/search'
          render={() => (
            <SearchBooks
              handleChange={this.handleChange}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
