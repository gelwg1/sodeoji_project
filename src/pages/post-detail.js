import { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRef } from 'react';
import { getPostByPostId } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Post from '../components/post/index';
import Header from '../components/header';
// import Actions from '../components/post/actions.js';
import Comments from '../components/post/comments';
import Sidebar from '../components/sidebar/index';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';

export default function PostDetail() {
    const { postId } = useParams();
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [post, setPost] = useState(null);
    const history = useHistory();  
    
    useEffect(() => {
      async function checkPostExists() {
        const post = await getPostByPostId(postId);
        if (post?.postId) {
          setPost(post);
        } else {
          history.push(ROUTES.NOT_FOUND);
        }
      }
      checkPostExists();
    }, [postId, history]);
       
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
      
        return (
          <div className="bg-gray-background">
            <Header />
            <div className="mt-4 d-flex flex-row">
                <Sidebar />
                <div className="mx-auto">
                    <Post content={post}/>
                    {/* <Actions
                      postId={post?.postId}
                      handleFocus={handleFocus}
                    /> */}
                    <Comments
                      postId={post?.postId}
                      user={user}
                    />
                </div>      
              </div> 
            </div>  
        );
}
