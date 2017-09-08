import React from 'react';
import PropTypes from 'prop-types';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import * as SHELVES from './constants/shelves';
import './Home.scss';

const Home = (props) => {
  const { books, handleChange } = props;

  return (
    <div className='home'>
      <div className='list-books'>
        <ListBooksTitle title='MyReads' />
        <div className='list-books-content'>
          <div>
            <BookShelf
              title='Currently Reading'
              shelf={SHELVES.CURRENTLY_READING}
              books={books}
              handleChange={handleChange}
            />
            <BookShelf
              title='Want to Read'
              shelf={SHELVES.WANT_TO_READ}
              books={books}
              handleChange={handleChange}
            />
            <BookShelf
              title='Read'
              shelf={SHELVES.READ}
              books={books}
              handleChange={handleChange}
            />
          </div>
        </div>
        <OpenSearch />
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default Home;
