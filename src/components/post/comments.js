import { useEffect, useState, React, useContext } from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';
import CommentForm from './comment-form';
import { getCommentsByPostId, snapshotToArray, deleteCommentApi, getCommentByCommentId } from '../../services/firebase';
import FirebaseContext from '../../context/firebase';
import "../../styles/comments.css";

export default function Comments({ postId, user }) {
  const [backendComments, setBackendComments] = useState(null);
  const [activeComment, setActiveComment] = useState(null);
  const { database, storage } = useContext(FirebaseContext);
  const [rootComments, setRootComments] = useState(null);


  const getReplies = (commentId) => {
    return backendComments
      .filter(backendComment => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.create_date).getTime() - new Date(b.create_date).getTime()
      );
  };


  const addComment = (text, parentId) => {
    console.log(text, parentId)
    var userId = user?.user_id;
    var username = user?.username;
    if (parentId === undefined) {
      parentId = '';
    }

    var commentId = database
      .ref(`Posts/${postId}/comments`)
      .push({
        id: postId,
        postId: postId,
        body: text,
        parentId: parentId,
        userId: userId,
        username: username,
        create_date: Date.now(),
        vote_numbers: 0,
        avatar: user?.avatar
      })
      .key;
    var commentRef = `Posts/${postId}/comments/` + commentId;
    database
      .ref(commentRef)
      .update({
        id: commentId
      });
    var comment = database.ref(`Posts/${postId}/comments`).child(commentId).once('value', (snapshot) => {
      const commentValue = snapshot.val();
      setBackendComments([commentValue, backendComments]);
      setActiveComment(null);
      console.log("comment", comment, "value", commentValue);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm('Are you sure that you want to remove comment?')) {
      deleteCommentApi(commentId).then(() => {
        const updateBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updateBackendComments);
      })
    }
  };

  useEffect(() => {
    async function getComments() {
      await database.ref(`Posts/${postId}/comments`).on('value', snapshot => {
        if (snapshot.exists()) {
          setBackendComments(snapshotToArray(snapshot));
          setRootComments(backendComments?.filter(
            (backendComment) => backendComment.parentId === ''
          ));
          console.log(rootComments);
          console.log(backendComments);
        }
      });
    }

    getComments();
  }, backendComments?.length);

  return (
    <div className="comments p-4 pt-1 pb-4">
      <h3 className="comments-title">Comments</h3>
      <div className="comments-container">
        {rootComments ? (rootComments.map((rootComment) => (
          <Comment
            key={rootComment?.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            user={user}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            parentId={rootComment.parentId}
          />
        ))) : null}
      </div>
      <div className="comment-form-title">Write Comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired
};