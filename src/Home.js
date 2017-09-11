import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListBooksTitle from './ListBooksTitle';
import BookShelf from './BookShelf';
import OpenSearch from './OpenSearch';
import * as SHELVES from './constants/shelves';
import './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.handleGetAll();
  }

  render() {
    const { myBooks, handleChange } = this.props;

    return (
      <div className='home'>
        <div className='list-books'>
          <ListBooksTitle title='React MyReads' />
          <div className='list-books-content'>
            <div>
              <BookShelf
                title='Currently Reading'
                shelf={SHELVES.CURRENTLY_READING}
                myBooks={myBooks}
                handleChange={handleChange}
              />
              <BookShelf
                title='Want to Read'
                shelf={SHELVES.WANT_TO_READ}
                myBooks={myBooks}
                handleChange={handleChange}
              />
              <BookShelf
                title='Read'
                shelf={SHELVES.READ}
                myBooks={myBooks}
                handleChange={handleChange}
              />
            </div>
          </div>
          <OpenSearch />
        </div>
      </div>
    );
  }
}

Home.defaultProps = {
  myBooks: [],
};

Home.propTypes = {
  myBooks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
      smallThumbnail: PropTypes.string,
    }),
  })),
  handleGetAll: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Home;
