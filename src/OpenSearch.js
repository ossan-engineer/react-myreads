import React from 'react';
import PropTypes from 'prop-types';
import './OpenSearch.css';

const OpenSearch = props => (
  <div className='open-search'>
    <a onClick={props.onAdd}>Add a book</a>
  </div>
);

OpenSearch.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default OpenSearch;
