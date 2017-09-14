import React from 'react';
import { Switch, Route } from 'react-router-dom';
import where from 'lodash.where';
import find from 'lodash.find';
import * as BooksAPI from './BooksAPI';
import Home from './Home';
import SearchBooks from './SearchBooks';
import NoMatch from './NoMatch';
import { NONE } from './constants/shelves';

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

  handleChangeMyBook = (event, id) => {
    const newMyBooks = this.state.myBooks.map(myBook => Object.assign({}, myBook));
    const shelf = event.target.value;

    newMyBooks.forEach((newMyBook) => {
      const newShelf = newMyBook.id === id ? shelf : newMyBook.shelf;

      newMyBook.shelf = newShelf; // eslint-disable-line no-param-reassign
    });

    this.setState({
      myBooks: newMyBooks,
    }, () => {
      BooksAPI.update(id, shelf);
    });

    // this.updateSearchedBooks(this.state.searchedBooks);
  };

  handleChangeSearchedBook = (event, id) => {
    // TODO: searchを表示した時は初期化する
    const newSearchedBooks = this.state.searchedBooks
      .map(searchedBook => Object.assign({}, searchedBook))
      .filter(searchedBook => searchedBook.id !== id);
    const additionalMyBook = this.state.searchedBooks.length > 0 ?
      find(this.state.searchedBooks, {
        id,
      }) :
      null;
    const shelf = event.target.value;
    newSearchedBooks.push(additionalMyBook);

    this.setState({
      searchedBooks: newSearchedBooks,
    }, () => {
      BooksAPI.update(id, shelf);
    });

    console.log('BEFORE');
    console.log(this.state.searchedBooks);
    // this.updateSearchedBooks(this.state.searchedBooks);
    console.log('AFTER');
    console.log(this.state.searchedBooks);
  };

  handleSearch = (event) => {
    if (event) {
      this.setState({
        query: event.target.value,
      });
    }

    if (this.state.query.length > 0) {
      BooksAPI.search(this.state.query).then((data) => {
        this.updateSearchedBooks(data);
      });
    } else {
      this.setState({
        searchedBooks: [],
      });
    }
  };

  updateSearchedBooks = (searchedBooks) => {
    console.log('UPDATED');
    const newSeachedBooks = searchedBooks.slice(); // eslint-disable-line no-unused-vars

    newSeachedBooks.forEach((searchedBook) => {
      this.state.myBooks.forEach((myBook) => {
        if (searchedBook.id === myBook.id) {
          where(newSeachedBooks, { id: myBook.id })[0].shelf = myBook.shelf;
        }
      });
    });

    this.setState({
      searchedBooks: Array.isArray(searchedBooks) ? newSeachedBooks : [],
    });
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
                handleChange={this.handleChangeMyBook}
                handleGetAll={this.handleGetAll}
              />
            )}
          />
          <Route
            path='/search'
            render={() => (
              <SearchBooks
                myBooks={this.state.myBooks}
                searchedBooks={this.state.searchedBooks}
                handleChange={this.handleChangeSearchedBook}
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
