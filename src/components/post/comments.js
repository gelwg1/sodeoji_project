import { useEffect, useState, React, useContext } from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';
import CommentForm from './comment-form';
import { getCommentsByPostId, snapshotToArray, deleteCommentApi, getCommentByCommentId } from '../../services/firebase';
import FirebaseContext from '../../context/firebase';

export default function Comments({ postId, user}) {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const { database, storage } = useContext(FirebaseContext);
 
  // var rootComments = [];
  // var listComments = database.ref(`Posts/${postId}/comments`).once('value', (snapshot) => {
  //   if (snapshot.exists()){
  //     // rootComments.push(snapshotToArray(snapshot));
  //      rootComments = snapshotToArray(snapshot);
  //   };
  // });
  var rootComments = database.ref(`Posts/${postId}`).once('value', snapshot => { 
      
        if (snapshot.exists()){
          console.log(snapshot.val().comments);
        }
    });


  const getReplies = commentId => {
    return backendComments
    .filter(backendComments => backendComments.parentId === commentId)
    .sort(
      (a,b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };
 

  const addComment = (text, parentId) => {
    var userId = user?.user_id;
    var username = user?.username;
    if(parentId===undefined){
      parentId='';
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
        vote_numbers: 0
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
  
  // console.log(getCommentsByPostId(postId));
  // useEffect(() => {
  //   const rootComments = getCommentsByPostId(postId);
    
  //   console.log("list comment ", listComments);
  //   if (listComments.length>0){
  //     console.log("list comment ", listComments);
  //     for(var i=0; i < listComments.length; i++){
  //       listComments[i].then((data) => {
  //         setBackendComments(data);
  //         console.log("list comment i", listComments[i], "data", data);
  //       });
  //     }
  //   }     
  // }, [rootComments]);


  return (
      <div className="comments p-4 pt-1 pb-4">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-container">
          {/* {rootComments?.map((rootComment) => (
            <Comment 
              key={rootComment?.id} 
              comment={rootComment} 
              replies={getReplies(rootComment.id)}
              user={user} 
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
            />
          ))} */}
        </div>
        <div className="comment-form-title">Write Comment</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
      </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired
};