import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../../components/NavBar';
import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';

import { useGetPostsQuery } from '../../store/apis/postApi';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetPostsQuery(page);

  const postRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const setNewPost = (post) => {
    console.log('setPost', post);
    console.log([post, ...posts]);
    setPosts([post, ...posts]);
  };

  useEffect(() => {
    if (isError) {
      console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (!isLoading && data) {
      setPosts((prevPosts) => [...prevPosts, ...data.data.data]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0);

      if (windowHeight + scrollTop >= documentHeight) {
        console.log('hit');
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="home">
        <button
          className="xl:block my-8 mx-0 p-2 bg-gray-900 text-white rounded-[10rem] text-x cursor-pointer text-center font-semibold text-white bg-blue-600 hover:bg-blue-800 flex justify-center items-center"
          onClick={openModal}
        >
          + Create Post
        </button>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNewPost={setNewPost}
      />
      {isLoading && <p>....Loading</p>}
      {!isLoading && posts.length === 0 && <p>No posts</p>}
      {posts.map((post) => (
        <Post
          postRef={postRef}
          key={post?._id}
          post_id={post?.filePath ? post._id : undefined}
          // username={post?.userData.username}
          desc={post?.description}
          title={post?.title}
          createdAt={post?.createdAt}
          post={post}
        />
      ))}
      {isLoading && <p>Loading more posts...</p>}
      {!isLoading && data && data.data.data.length === 0 && (
        <p>No more posts to load</p>
      )}
    </>
  );
};

export default Home;
