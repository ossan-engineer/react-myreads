import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import * as CATEGORIES from './constants/categories';

import './App.css';

const books = [
  {
    id: '001',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    imageUrl: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.CURRENTLY_READING,
  },
  {
    id: '002',
    title: 'Ender\'s Game',
    author: 'Orson Scott Card',
    imageUrl: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.CURRENTLY_READING,
  },
  {
    id: '003',
    title: 'Oh, the Places You\'ll Go!',
    author: 'Seuss',
    imageUrl: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.WANT_TO_READ,
  },
  {
    id: '004',
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    imageUrl: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.WANT_TO_READ,
  },
  {
    id: '005',
    title: '1776',
    author: 'David McCullough',
    imageUrl: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.READ,
  },
  {
    id: '006',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    imageUrl: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.READ,
  },
  {
    id: '007',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    imageUrl: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api', // eslint-disable-line max-len
    category: CATEGORIES.READ,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books,
    };
  }

  componentDidMount() {
    BooksAPI.getAll();
  }

  handleChange = (event, id) => {
    // TODO: Update state
    const newState = this.state.books.concat();

    this.setState({
      books: newState,
    });

    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    console.log(id);
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
                    category={CATEGORIES.CURRENTLY_READING}
                    books={this.state.books}
                    handleChange={this.handleChange}
                  />
                  <BookShelf
                    title='Want to Read'
                    category={CATEGORIES.WANT_TO_READ}
                    books={this.state.books}
                    handleChange={this.handleChange}
                  />
                  <BookShelf
                    title='Read'
                    category={CATEGORIES.READ}
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
