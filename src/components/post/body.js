import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import PostDetail from './post-detail';
import { Link } from 'react-router-dom';

export default function Body({ date, title, content }) {

  return (
    <div className="p-4 pt-2 pb-1">
      <a className="font-bold text-black-light">
        <Link to={`/dashboard/post-details/${date}`}>
          <PostDetail content={content}></PostDetail>
        </Link>
         {title}
      </a>
      <p className="italic">{content}</p>
    </div>
  );
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
