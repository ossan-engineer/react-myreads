import React from 'react';
import './OpenSearch.css';

const OpenSearch = (props) => (
  <div className='open-search'>
    <a onClick={props.onAdd}>Add a book</a>
  </div>
);

export default OpenSearch;
