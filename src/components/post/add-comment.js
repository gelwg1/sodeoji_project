import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import * as DEFAULT_IMAGE_PATH from '../../constants/paths';


export default function AddComment({ postId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { database, firebase, FieldValue } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;
  let username = user?.username;
  let avatar = user?.avatar;
  if  (username == undefined){
    username = "Undefine User";
  }
  if (avatar == undefined){
    avatar = DEFAULT_IMAGE_PATH ;
  }

  const handleSubmitComment = (event) => {
  setComments([...comments, { username, avatar, comment }]);
  setComment('');
  return database
    .ref('Posts')
    .child(postId)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({ username, avatar, comment })
    });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="コメントする"
          autoComplete="off"
          className="text-sm text-gray-base w-90 mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="コメントする..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          送信
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
