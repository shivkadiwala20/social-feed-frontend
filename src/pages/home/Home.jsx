import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';

import { useGetPostsQuery } from '../../store/apis/postApi';
import { useEffect, useState, useRef } from 'react'; // Import useRef
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../actions/action.js';

const Home = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(page);
  const posts = useSelector((state) => state.posts.posts);
  const [hasMore, setHasMore] = useState(true);
  const topRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const bottomOfPage = useRef();

  useEffect(() => {
    if (isError) {
      console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchPost(data?.data?.data));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const total = data.data?.total;
      if (page * 5 >= total) {
        setHasMore(false);
      }
    }
  }, [data, page]);

  useEffect(() => {
    const totalPages = Math.ceil(data?.data?.total / 5);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setPagination(pages);
  }, [data]);

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < pagination.length) {
      setPage(page + 1);
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
      {posts?.length === 0 && !isLoading && <p>No posts are there</p>}
      <div className="min-h-screen">
        <div ref={topRef}>Page {page}</div>
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
      </div>
      <div className="flex justify-center mt-8">
        <nav className="flex space-x-4" aria-label="Pagination">
          <button
            className={`px-3 py-1 rounded-md ${
              page === 1
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white'
            }`}
            onClick={goToPrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          {pagination.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 rounded-md ${
                pageNumber === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md ${
              page === pagination.length
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white'
            }`}
            onClick={goToNextPage}
            disabled={page === pagination.length}
          >
            Next
          </button>
        </nav>
      </div>
      <div ref={bottomOfPage}></div>
    </>
  );
};

export default Home;
