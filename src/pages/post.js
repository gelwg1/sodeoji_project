import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import Header from '../components/post/header';
import Image from '../components/post/image';
import Body from '../components/post/body';
import Footer from '../components/post/footer'
// import Actions from '../components/post/actions.js';
import Comments from '../components/post/comments';
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
          <div className="rounded row border bg-white border-gray-primary mb-12">
            <Header username={post?.author} avatarSrc={post?.author_avatar} date={post?.create_date} post={post}/>
            <Image src={post?.image_url}/>
            <Body postId={post?.postId} title={post?.title} content={post?.content} post={post}/>
            <Footer votes={post?.vote_numbers} comments={post?.comment_numbers}/>
            {/* <Actions
              postId={post?.postId}
              handleFocus={handleFocus}
            /> */}
      
            <Comments
              postId={post?.postId}
              comments={post?.comments}
              postTime={post?.create_date}
              commentInput={commentInput}
            />      
          </div>
        );
}
