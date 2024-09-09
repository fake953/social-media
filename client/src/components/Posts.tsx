import { useAppDispatch, useAppSelector } from "../services/state/hooks";
import { useUpdateUserFriendsListMutation } from "../services/api/apiQuery";
import { useLikePostMutation } from "../services/api/apiQuery";
import { getImageAddress } from "../utils/getImageAddress";
import {
  CommentIcon,
  HeartIcon,
  ShareIcon,
  UserMinesIcon,
  UserPlusIcon,
} from "./icons";
import { postType } from "../Types/postTypes";
import { useState, useEffect } from "react";
import { setUserFriends } from "../services/state/userSlice";
import alertFunction from "../utils/alert";
import { useNavigate } from "react-router-dom";
type LikePostType = {
  id: string;
  userId: string;
  secret: string;
};
type UpdateUserFriendsType = {
  id: string;
  friendId: string;
  secret: string;
};
type Props = {
  data: postType[] | null;
  isLoading: boolean;
  parent: string;
};
const Posts = ({ data, isLoading, parent }: Props) => {
  const [posts, setPosts] = useState<null | postType[]>(null);
  const [likePost] = useLikePostMutation();
  const [updateUserFriendsList] = useUpdateUserFriendsListMutation();
  const [isCommentOpened, setIsCommentOpened] = useState<string | boolean>();
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handelIsCommentOpened = (id: string) => {
    if (id === isCommentOpened) {
      setIsCommentOpened(false);
    } else if (id !== isCommentOpened) {
      setIsCommentOpened(id);
    }
  };
  const handelUpdateUserFriends = async ({
    id,
    friendId,
    secret,
  }: UpdateUserFriendsType) => {
    if (!user || !token) {
      return alertFunction("add friends");
    }
    try {
      const res = await updateUserFriendsList({ id, friendId, secret });

      dispatch(setUserFriends(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handelLikePost = async ({ id, userId, secret }: LikePostType) => {
    if (!user || !token) {
      return alertFunction("like a post");
    }
    const res = await likePost({
      id,
      userId,
      secret,
    });

    const newData = posts?.map((p) => {
      if (p._id === res.data.data._id) {
        p = res.data.data;
      }
      return p;
    });
    setPosts(newData!);
  };
  const checkIsFriend = (creatorOfPostId: string) => {
    if (user?.friends.includes(creatorOfPostId)) {
      return <UserMinesIcon />;
    } else {
      return <UserPlusIcon />;
    }
  };
  useEffect(() => {
    setPosts(data);
  }, [data]);
  return (
    <section className="">
      {isLoading ? (
        <div className="grid h-full max-h-[300px] min-h-[160px] w-full  animate-pulse place-items-center rounded-lg bg-card"></div>
      ) : !posts?.length <= 0 ? (
        <div className="no-scrollbar h-screen overflow-auto">
          {posts?.map((post: postType, i: number) => (
            <div key={i} className="mb-8 bg-card rounded-lg p-5 shadow-lg">
              <header className="flex justify-between items-center  pb-3">
                <div
                  onClick={() => navigate(`/profile/${post.userId}`)}
                  className="flex items-center cursor-pointer"
                >
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
                    <h6 className="text-sm text-start font-thin text-copy-primary">
                      {post.location}
                    </h6>
                  </div>
                </div>
                {parent === "Home" && post.userId !== user?._id && (
                  <div
                    className="bg-gray-800 rounded-full p-1 cursor-pointer"
                    onClick={() =>
                      handelUpdateUserFriends({
                        id: user?._id || "",
                        friendId: post.userId,
                        secret: token || "",
                      })
                    }
                  >
                    {checkIsFriend(post.userId)}
                  </div>
                )}
              </header>

              <main>
                <h1 className="text-sm text-start font-thin text-copy-primary">
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
                          userId: user?._id || "",
                          secret: token || "",
                        })
                      }
                    >
                      <HeartIcon
                        color={
                          post.likes.includes(user ? user._id : "")
                            ? true
                            : false
                        }
                      />
                    </div>
                    <h6>{post.likes.length}</h6>
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
                {post.comments.map((comment, i) => (
                  <li key={i} className="text-start mt-2">
                    {/* <h1 className="pt-3">{comment.name}</h1> */}
                    <h3 className="text-sm text-start font-thin text-gray-300">
                      {comment}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl text-center text-red-400">There is no post </h1>
      )}
    </section>
  );
};

export default Posts;
