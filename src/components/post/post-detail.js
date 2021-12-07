import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Body from './body';
import Footer from './footer'
import Actions from './actions';
import Comments from './comments';

export default function PostDetail({ post }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded row border bg-white border-gray-primary mb-12">
      <Header username={post?.author} avatarSrc={post?.author_avatar} date={post?.create_date} post={post}/>
      <Image src={post?.image_url}/>
      <Body postId={post?.postId} title={post?.title} content={post?.content}/>
      <Footer votes={post?.vote_numbers} comments={post?.comment_numbers}/>
      {/* <Actions
        postId={post?.postId}
        handleFocus={handleFocus}
      /> */}

      {/* <Comments
        postId={post?.postId}
      /> */}

    </div>
  );
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    author_avatar: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    create_date: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    comment_numbers: PropTypes.number.isRequired,
    vote_numbers: PropTypes.number.isRequired
  })
};
