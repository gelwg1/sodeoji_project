import { useState, useEffect } from 'react';
import { getPosts } from '../services/firebase';

export default function usePosts(type, param2, user) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getTimelinePosts() {
      const PostList = await getPosts(type, param2, user);
      PostList.sort((a, b) => b.vote_numbers - a.vote_numbers);
      setPosts(PostList);
    }

    getTimelinePosts();
  });

  return { posts };
}
