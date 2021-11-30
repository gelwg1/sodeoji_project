/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePosts from '../hooks/use-posts';
import Post from './post';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Timeline({type, param2}) {
  const { user } = useContext(LoggedInUserContext);
  var { posts } = usePosts(type, param2, user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (posts) setLoading(true);
  })
  return (
    <div className="container col-span-2">
      {!loading ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        posts.map((content) => <Post content={content} />)
      )}
    </div>
  );
}
