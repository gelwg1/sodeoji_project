import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Body from './body';
import Footer from './footer';

export default function Post({ content }) {

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content?.author} avatarSrc={content?.author_avatar} date={content?.create_date} content={content}/>
      <Image src={content?.image_url}/>
      <Body date={content?.create_date} title={content?.title} content={content?.content}/>
      <Footer votes={content?.vote_numbers} comments={content?.comment_numbers}/>
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    key: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    author_avatar: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    create_date: PropTypes.number.isRequired,
    comment_numbers: PropTypes.number.isRequired,
    vote_numbers: PropTypes.number.isRequired
  })
};
