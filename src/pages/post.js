import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import PostDetail from '../components/post/post-detail';
import { useRef } from 'react';

export default function Post() {
    const { postId } = useParams();
    const { database } = useContext(FirebaseContext);
    var post = database
        .ref('Posts')
        .child(postId);
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
      
    return (
        <PostDetail post={post}/>
    );
}
