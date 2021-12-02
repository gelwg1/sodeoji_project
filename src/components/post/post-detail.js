import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Body from './body';
import Footer from './footer'
import Actions from './actions';
import Comments from './comments';


export default function PostDetail({ post, handleClose }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-8 border bg-white border-gray-primary mb-12">
      <Header username={post?.author} avatarSrc={post?.author_avatar} date={post?.create_date} content={post}/>
      <button className={` bg-blue-medium text-white w-45 rounded h-8 font-bold`}     
        onClick={handleClose}
        > 戻る
      </button>
      <Image src={post?.image_url}/>
      <div className="p-4 pt-2 pb-1">
      <a className="font-bold text-black-light">
         {post?.title}
      </a>
      <p className="italic">{post?.content}</p>
      </div>
      <Footer votes={post?.vote_numbers} comments={post?.comment_numbers}/>
      <Actions
        postId={post?.key}
        handleFocus={handleFocus}
      />

      {/* <Comments
        postId={post?.key}
        comments={post?.comments}
        posted={post?.dateCreated}
        commentInput={commentInput}
      /> */}

    </div>
  );
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    key: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    author_avatar: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    create_date: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    comment_numbers: PropTypes.number.isRequired,
    vote_numbers: PropTypes.number.isRequired
  })
};
