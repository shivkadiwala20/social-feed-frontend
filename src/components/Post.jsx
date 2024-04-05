import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { GoComment } from 'react-icons/go';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './Post.css';
import PropTypes from 'prop-types';

import { useGetPostImageQuery } from '../store/apis/postApi';

export const Post = ({
  desc = '',
  title = '',
  createdAt = '',
  post_id = '',
  postRef,
  post,
  username,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getMonth = new Date(createdAt).toLocaleString('default', {
    month: 'long',
  });

  const date = createdAt.split('T')[0].split('-');
  const postCreatedAt = date[2] + ' ' + getMonth + ' ' + date[0];

  const { data } = useGetPostImageQuery(post_id, { skip: !post_id });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="post" ref={postRef}>
      <div className="flex border ml-0 sm:mr-0 sm:mx-3 pl-2 mt-10 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-slate-100">
        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative">
            <h2 className="font-semibold cursor-pointer">{username}</h2>
            <h2 className="font-semibold cursor-pointer">{title}</h2>
          </div>
          <p
            className="py-3 cursor-pointer max-w-lg break-words"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {desc}{' '}
          </p>

          {loading ? (
            <div className="loader-container">
              <ClipLoader color="#123abc" loading={loading} size={35} />
            </div>
          ) : (
            <div
              className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <img
                src={data?.imageData ? data?.imageData : 'sss'}
                className="max-w-full max-h-80 rounded-md my-2 mx-auto"
                alt="avatar"
              />
            </div>
          )}

          <p className="text-sm text-gray-600">{postCreatedAt}</p>
          <div className="flex justify-between pt-8">
            <div className="flex">
              {isLiked ? (
                <BsSuitHeartFill
                  className="text-xl cursor-pointer text-red-600"
                  onClick={handleLike}
                />
              ) : (
                <BsSuitHeart
                  className="text-xl cursor-pointer"
                  onClick={handleLike}
                />
              )}
            </div>
            <div className="flex">
              <GoComment
                onClick={() => navigate(`/post/${post.id}`)}
                className="text-xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  desc: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  post_id: PropTypes.string,
  postRef: PropTypes.object,
  post: PropTypes.object,
  username: PropTypes.string,
};
