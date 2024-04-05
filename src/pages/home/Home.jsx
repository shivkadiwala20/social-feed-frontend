import { useEffect, useRef, useState } from 'react';
import { Post } from '../../components/Post';
import CreatePostModal from '../../components/CreatePostModal';
import './home.css';
import { useGetPostsQuery } from '../../store/apis/postApi';
import { ClipLoader } from 'react-spinners'; // Import the spinner component
import { v4 as uuidv4 } from 'uuid';
const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetPostsQuery(page);
  console.log('data', data);
  const postRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(new Set());
  const [loadingMore, setLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const setNewPost = (post) => {
    setPosts((prevPosts) => new Set([post, ...prevPosts]));
  };

  useEffect(() => {
    if (isError) {
      console.log('error', error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (!isLoading && data) {
      setPosts((prevPosts) => new Set([...prevPosts, ...data.data.data]));
      setLoadingMore(false);
      if (data.data.data.length === 0) {
        setReachedEnd(true);
      }
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

      if (
        windowHeight + scrollTop >= documentHeight &&
        !reachedEnd &&
        !isLoading
      ) {
        console.log('hit');
        setPage((prevPage) => prevPage + 1);
        setLoadingMore(true);
        setTimeout(() => setLoadingMore(false), 4000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reachedEnd, isLoading]);

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
      {[...posts].map(
        (
          post // Convert Set back to an array for mapping
        ) => (
          <Post
            postRef={postRef}
            key={uuidv4()}
            post_id={post?.filePath ? post._id : undefined}
            username={post?.userData?.username}
            desc={post?.description}
            title={post?.title}
            createdAt={post?.createdAt}
            post={post}
          />
        )
      )}
      {loadingMore && (
        <ClipLoader color="#123abc" loading={loadingMore} size={35} />
      )}{' '}
      {!isLoading && data && data.data.data.length === 0 && (
        <p>No more posts to show</p>
      )}
    </>
  );
};

export default Home;
