import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ postId, comments: allComments, postTime, commentInput }) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState('');

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  postTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(postTime);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments?.slice(0, commentsSlice).map((item) => (
          <p key={`${item?.comment}-${item?.username}`} className="mb-1">
            <Link to={`/p/${item?.username}`}>
              <span className="mr-1 font-bold">{item?.username}</span>
            </Link>
            <span>{item?.comment}</span>
          </p>
        ))}
        {comments?.length >= 3 && commentsSlice < comments?.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
            他のコメントを見る
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {postTime} 前
        </p>
      </div>
      <AddComment
        postId={postId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  postTime: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
};