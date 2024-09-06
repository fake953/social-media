import {
  useGetAllPostsQuery,
  useGetUserFriendsMutation,
} from "../services/api/apiQuery";
import { Ads, CreatePost, HomeNav } from "../components/homeComponents";
import Posts from "../components/Posts";
import User from "../components/User";
import Friends from "../components/Friends";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../services/state/hooks";
import { postType } from "../Types/postTypes";
import { LockIcon } from "../components/icons";

const Home = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const [friends, setFriends] = useState(null);
  const [posts, setPosts] = useState<postType[] | null>(null);
  const { data, isLoading } = useGetAllPostsQuery(null);
  const [getUserFriends] = useGetUserFriendsMutation();
  // const userInformation = useGetUserInformationQuery({
  //   id: user?._id,
  //   secret: token,
  // });

  useEffect(() => {
    if (!user || !token) return;
    const friendsData = async () => {
      const res = await getUserFriends({
        id: user?._id,
        secret: token,
      });
      setFriends(res.data.data);
    };
    friendsData();
  }, [user, token, getUserFriends]);
  useEffect(() => {
    if (!data) return;
    setPosts(data?.data);
  }, [data]);

  const updatePosts = (post: postType) => {
    if (!posts) return;
    setPosts([post, ...posts]);
    sweetAlert();
  };
  const navigate = useNavigate();
  return (
    <div className="bg-background">
      <HomeNav />
      <div className="container	mx-auto w-full  grid grid-flow-col grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8 mt-5 2xl:grid-cols-4">
        <div className=" text-center hidden md:block col-span-1 ">
          {user && token ? (
            <User data={user} parent="Home" />
          ) : (
            <div
              onClick={() => navigate("/auth/login")}
              className="pb-7 cursor-pointer grid h-full max-h-[300px] min-h-[160px] w-full max-w-xs  place-items-center rounded-lg bg-card"
            >
              <LockIcon />
              <h6 className="text-sm text-start font-thin text-gray-200">
                Please login to see user details
              </h6>
            </div>
          )}
        </div>
        <div className=" text-center  col-span-1  2xl:col-span-2">
          <CreatePost updatePosts={updatePosts} />
          <Posts data={posts} isLoading={isLoading} parent="Home" />
        </div>
        <div className=" text-center hidden xl:block xl:col-span-1">
          <Ads />
          <Friends parent="Home" data={friends} />
        </div>
      </div>
    </div>
  );
};

export default Home;
