import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './OpenSearch.css';

const OpenSearch = () => (
  <div className='open-search'>
    <Link
      to='/search'
    />
  </div>
);

export default OpenSearch;
