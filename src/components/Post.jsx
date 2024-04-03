import { useState } from 'react';
import { GoComment } from 'react-icons/go';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
// import { getFormattedDate } from '../utilities/getFormattedDate';
// import { likePost, dislikePost } from '../features/post/helpers';
import { useLocation, useNavigate } from 'react-router-dom';

export const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      dispatch(likePost({ postId: post?._id, token }));
    } else {
      dispatch(dislikePost({ postId: post?._id, token }));
    }
  };

  return (
    <div className="flex border ml-0 sm:mr-0 sm:mx-3 pl-2 mt-10 pr-1 sm:pr-0 sm:px-5 py-3 hover:bg-slate-100">
      <div className="w-full px-4 py-3">
        <div className="w-full flex justify-between relative">
          <h2
            onClick={() => navigate(`/profile/${post?.username}`)}
            className="font-semibold cursor-pointer"
          >
            {/* {post?.title} */}shiv kadiwala
          </h2>
        </div>
        <p
          className="py-3 cursor-pointer max-w-lg break-words"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {/* {post?.description} */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque,{' '}
          <aut className=""></aut>
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
        <p className="text-sm text-gray-600">
          {/* {getFormattedDate(post?.createdAt)} */}
        </p>
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
  );
};
