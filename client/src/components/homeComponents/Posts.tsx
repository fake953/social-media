import { useAppSelector } from "../../services/state/hooks";
import { useGetAllPostsQuery } from "../../services/api/apiQuery";
import { useLikePostMutation } from "../../services/api/apiQuery";

import { getImageAddress } from "../../utils/getImageAddress";
import {
  CommentIcon,
  HeartIcon,
  ShareIcon,
  UserPlusIcon,
} from "../../components/icons";
import { postType } from "../../Types/postTypes";
import { useState } from "react";
// import LikePost from "../../utils/likePost";
const Posts = () => {
  const [likePost] = useLikePostMutation();
  const [isCommentOpened, setIsCommentOpened] = useState<string | boolean>();
  const { user, token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetAllPostsQuery(null);
  console.table(data?.data);

  const handelIsCommentOpened = (id: string) => {
    if (id === isCommentOpened) {
      setIsCommentOpened(false);
    } else if (id !== isCommentOpened) {
      setIsCommentOpened(id);
    }
  };
  const handelLikePost = async ({
    id,
    userId,
    secret,
  }: {
    id: string;
    userId: string;
    secret: string;
  }) => {
    const res = await likePost({
      id,
      userId,
      secret,
    });

    console.log(res);
  };
  return (
    <section className="">
      {isLoading ? (
        <div className="grid h-full max-h-[300px] min-h-[160px] w-full  animate-pulse place-items-center rounded-lg bg-gray-900"></div>
      ) : (
        <div className="no-scrollbar h-screen overflow-auto">
          {data.data.map((post: postType, i: number) => (
            <div key={i} className="mb-8 bg-gray-900 rounded-lg p-5">
              <header className="flex justify-between items-center  pb-3">
                <div className="flex items-center">
                  {" "}
                  <img
                    src={getImageAddress(post.userPicturePath)}
                    alt="user photo"
                    className=" object-cover rounded-full mr-3"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="">
                    <h1 className="text-md ">
                      {post.first_name} {""} {post.last_name}
                    </h1>
                    <h6 className="text-sm text-start font-thin text-gray-400">
                      {post.location}
                    </h6>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-full p-0.5">
                  <UserPlusIcon />
                </div>
              </header>

              <main>
                <h1 className="text-sm text-start font-thin text-gray-200">
                  {post.description}
                </h1>
                <img
                  src={getImageAddress(post.picturePath)}
                  alt="post image"
                  className="rounded-xl mt-2 "
                />
              </main>
              <footer className="flex justify-between mt-3">
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <div
                      className="cursor-pointer "
                      onClick={() =>
                        handelLikePost({
                          id: post._id,
                          userId: post.userId,
                          secret: token,
                        })
                      }
                    >
                      <HeartIcon />
                    </div>
                    <h6>{post.likes?.length}</h6>
                  </div>
                  <div className="flex gap-2">
                    <span
                      onClick={() => handelIsCommentOpened(post._id)}
                      className="cursor-pointer"
                    >
                      <CommentIcon />
                    </span>

                    <h6>{post.comments.length}</h6>
                  </div>
                </div>
                <div>
                  <ShareIcon />
                </div>
              </footer>
              <ul hidden={Boolean(post._id !== isCommentOpened)}>
                {post.comments.map((comment) => (
                  <li className="text-start ">
                    <h1 className="pt-3">{comment.name}</h1>
                    <h3 className="text-sm text-start font-thin text-gray-300">
                      {comment.value}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Posts;
