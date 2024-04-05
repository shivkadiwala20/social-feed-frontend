import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';

import { useGetPostsQuery } from '../../store/apis/postApi';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../actions/action.js';

const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(page);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
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
      dispatch(fetchPost(data?.data?.data));
      if (data?.data?.data.length === 0 && page !== 1) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, isSuccess]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      {isLoading && <p>....Loading</p>}
      {posts?.length === 0 && !isLoading && <p>No posts is there</p>}
      {posts.map((post) => (
        <Post
          key={post?._id}
          post_id={post.filePath ? post?._id : undefined}
          username={post?.userData?.username}
          desc={post?.description}
          title={post?.title}
          createdAt={post?.createdAt}
          post={post}
        />
      ))}
      {isLoading && <p>Loading more posts...</p>}
      {!isLoading && !hasMore && <p>You're all caught up!</p>}
      <div className="pagination">
        {page > 1 && <button onClick={prevPage}>Back</button>}
        <button
          onClick={nextPage}
          style={{
            display:
              !hasMore || (posts?.length === 0 && !isLoading)
                ? 'none'
                : 'block',
          }}
          disabled={!hasMore && posts?.length === 0 && !isLoading}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
