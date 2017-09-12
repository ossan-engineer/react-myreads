import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.css';

const NoMatch = () => (
  <div className='no-match'>
    <div>
      <div className='no-match_title'>
        404 Not Found
      </div>
      <div className='no-match_link'>
        <Link to='/'>
          Back to home
        </Link>
      </div>
    </div>
  </div>
);

export default NoMatch;
