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
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(1);
  const [refetchPost] = useLazyGetPostsQuery();
  //console.log('refetchPost', refetchPost);
  //console.log('postData', data?.data);
  const postRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      //console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      const postData = data?.data?.data || [];
      //console.log('mil raha hai', postData);
      setPosts((prevPosts) => [...prevPosts, ...postData]); // Append new posts to existing ones
      setHasMore(data?.data?.nextPage); // Set hasMore based on whether there is a next page
    }
  }, [data, isSuccess]);

  const setNewPost = (post) => {
    //console.log('setPost', post);
    setPosts([post, ...posts]);
  };

  const closeModal = () => {
    //console.log('closeModal');
    setIsModalOpen(false);
  };

  const loadMorePosts = () => {
    if (!isFetchingMore && hasMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMorePosts(); // Load more posts when scrolled to bottom
    }
  };

  useEffect(() => {
    if (page > 1) {
      // Fetch more posts when page changes
      const fetchData = async () => {
        try {
          const nextPageData = await fetchMorePosts(page);
          setPosts((prevPosts) => [...prevPosts, ...nextPageData.data.data]);
          setHasMore(nextPageData.data.nextPage);
          setIsFetchingMore(false);
        } catch (error) {
          console.error('Error fetching more posts:', error);
          setIsFetchingMore(false);
        }
      };
      fetchData();
    }
  }, [page]);

  const fetchMorePosts = async (pageNumber) => {
    // Implement your logic to fetch more posts here
    // Example:
    const response = refetchPost(pageNumber);
    //console.log('bhai mila ki nai', response);
    if (!response.ok) {
      throw new Error('Failed to fetch more posts');
    }
    return response.json();
  };

  return (
    <>
      <NavBar />
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
      {posts.map((post, index) => (
        <Post
          postRef={index === 0 ? postRef : null}
          key={post?._id}
          post_id={post.filePath ? post?._id : undefined}
          desc={post?.description}
          title={post?.title}
          createdAt={post?.createdAt}
          post={post}
        />
      ))}
      {isFetchingMore && <p>Loading more posts...</p>}
      {!isFetchingMore && !hasMore && <p>No more posts to load</p>}
    </>
  );
};

export default Home;
