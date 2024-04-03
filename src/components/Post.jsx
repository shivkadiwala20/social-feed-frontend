/* eslint-disable react/prop-types */
import { useState } from 'react';
import { GoComment } from 'react-icons/go';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
// import { getFormattedDate } from '../utilities/getFormattedDate';
// import { likePost, dislikePost } from '../features/post/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import './Post.css';

import { useGetPostImageQuery } from '../store/apis/postApi';

export const Post = ({
  desc = '',
  title = '',
  createdAt = '',
  post_id = '',
  postRef,
  post,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const getMonth = new Date(createdAt).toLocaleString('default', {
    month: 'long',
  });

  const date = createdAt.split('T')[0].split('-');
  const postCreatedAt = date[2] + ' ' + getMonth + ' ' + date[0];

  const { data } = useGetPostImageQuery('65f3f668299fa9a4d47c2a2f');
  console.log(data);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      dispatch(likePost({ postId: post?._id, token }));
    } else {
      dispatch(dislikePost({ postId: post?._id, token }));
    }
  };

  return (
    <div className="post" ref={postRef}>
      <div className="flex border ml-0 sm:mr-0 sm:mx-3 pl-2 mt-10 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-slate-100">
        <div className="w-full px-4 py-3">
          <div className="w-full flex justify-between relative">
            <h2 className="font-semibold cursor-pointer">{title}</h2>
          </div>
          <p
            className="py-3 cursor-pointer max-w-lg break-words"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {desc}{' '}
          </p>
          {post?.postImageUrl && (
            <div
              className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <img
                //   src={post?.postImageUrl}
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
              <span className="text-sm pl-4 font-semibold">
                {pathname.includes('post')
                  ? ''
                  : post?.likes?.likeCount
                    ? post?.likes?.likeCount
                    : null}
              </span>
            </div>
            <div className="flex">
              <GoComment
                onClick={() => navigate(`/post/${post.id}`)}
                className="text-xl cursor-pointer"
              />
              <span className="text-sm pl-4 font-semibold">
                {pathname.includes('post')
                  ? ''
                  : post?.comments?.length > 0
                    ? post?.comments?.length
                    : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
