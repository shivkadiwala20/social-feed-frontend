import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';

import { useGetPostsQuery } from '../../store/apis/postApi';
import { useEffect, useState, useRef } from 'react'; // Import useRef
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../actions/action.js';

const Home = () => {
  const [page, setPage] = useState(1);

  const [posts, setPosts] = useState([]);
  const [isNewPost, setIsNewPost] = useState(false);

  // 5 -> setPosts([...posts, 5]) -> posts = 5
  // 5 -> setPosts([...posts, 5]) -> posts = 10
  // 5 -> setPosts([...posts, 5]) -> posts = 15
  // 1 -> setPosts([...posts, 1]) -> posts = 16 (setHasMore -> false)

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery(page);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialPosts = useSelector((state) => state.posts.posts);
  const [hasMore, setHasMore] = useState(true);
  const topRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add useRef to keep track of the bottom of the page
  const bottomOfPage = useRef();

  useEffect(() => {
    if (isError) {
      console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      if (!initialPosts[0].userData) {
        setIsNewPost(true);
        return;
      }

      if (isNewPost) {
        setPosts([initialPosts[0], ...posts]);
        setIsNewPost(false);
      } else {
        setPosts([...posts, ...initialPosts]);
      }
    }
  }, [initialPosts]);

  useEffect(() => {
    // console.log(posts);
  }, [posts]);

  useEffect(() => {
    const newPosts = data?.data?.data;
    if (newPosts) {
      console.log(newPosts);
      setPosts([...posts, ...newPosts]);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchPost(data?.data?.data));
      return;
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
    const handleScroll = () => {
      const bottomOffset =
        bottomOfPage.current.getBoundingClientRect().top - window.innerHeight;

      if (bottomOffset < 0) {
        setPage((prevPage) => prevPage + 1);
        window.removeEventListener('scroll', handleScroll);
        if (topRef) {
          // topRef.current.scrollIntoView({ behavior: 'instant' });
        }
      }
    };

    if (hasMore) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data, hasMore]);

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
      <div className="min-h-screen">
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
      <div ref={bottomOfPage}></div>{' '}
    </>
  );
};

export default Home;
