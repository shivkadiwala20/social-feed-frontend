import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/NavBar';
import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';

import {
  useGetPostsQuery,
  useLazyGetPostsQuery,
} from '../../store/apis/postApi';
import Profile from '../profile/Profile';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(page);

  const [refetch] = useLazyGetPostsQuery();

  // console.log('postData', data?.data);
  const userData = data?.data?.data;
  console.log(userData);
  userData?.map((userData) =>
    console.log('userData', userData?.userData.username)
  );

  const postRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      const postData = data?.data?.data || [];
      console.log('mil raha hai', postData);
      // setPosts((prevPosts) => [...prevPosts, ...postData]);
      setPosts(postData);
      setHasMore(true);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    console.log('postts', posts);
  }, [posts]);

  const setNewPost = (post) => {
    console.log('setPost', post);
    setPosts([post, ...posts]);
  };

  const closeModal = () => {
    console.log('closeModal');
    setIsModalOpen(false);
  };

  const loadMorePosts = () => {
    console.log('loading more posttt...');
    if (!isLoading && hasMore) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMorePosts();
    }
  };

  return (
    <>
      <div className="home">
        <button
          className=" xl:block my-8 mx-0 p-2 bg-gray-900 text-white rounded-[10rem]    text-x cursor-pointer text-center
                  font-semibold text-white bg-blue-600 hover:bg-blue-800 flex  
                    justify-center items-center"
          onClick={openModal}
        >
          + Create Post
        </button>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setNewPost={setNewPost}
      />
      {isLoading && <p>....Loading</p>}
      {posts?.length === 0 && !isLoading && <p>No posts</p>}
      {posts.map((post) => (
        <Post
          postRef={postRef}
          key={post?._id}
          post_id={post.filePath ? post?._id : undefined}
          username={post?.userData.username}
          desc={post?.description}
          title={post?.title}
          createdAt={post?.createdAt}
          post={post}
        />
      ))}
      {isLoading && <p>Loading more posts...</p>}
      {!isLoading && !hasMore && <p>No more posts to load</p>}
    </>
  );
};

export default Home;
