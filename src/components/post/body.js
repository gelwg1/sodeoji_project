import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

export default function Body({ postId, title, content}) {

  return (
    <div className="p-4 pt-2 pb-1">
      <a className="font-bold text-black-light" href={`/dashboard/post-details/${postId}`} >
        {title}
      </a>
      <p className="italic">{content}</p>
    </div>
  );
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
