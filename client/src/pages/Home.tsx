import {
  useGetAllPostsQuery,
  useGetUserFriendsMutation,
  useGetUserInformationQuery,
} from "../services/api/apiQuery";
import {
  // CreatePost,
  Ads,
  HomeNav,
} from "../components/homeComponents";
import Posts from "../components/Posts";
import User from "../components/User";
import Friends from "../components/Friends";

import { useEffect, useState } from "react";
import { useAppSelector } from "../services/state/hooks";

const Home = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const [friends, setFriends] = useState(null);
  const { data, isLoading } = useGetAllPostsQuery(null);
  const [getUserFriends] = useGetUserFriendsMutation();
  const userInformation = useGetUserInformationQuery({
    id: user?._id,
    secret: token,
  });

  useEffect(() => {
    const friendsData = async () => {
      const res = await getUserFriends({
        id: user?._id,
        secret: token,
      });
      setFriends(res.data.data);
    };
    friendsData();
  }, [user, token, getUserFriends]);

  return (
    <div>
      <HomeNav />
      <div className="container	mx-auto w-full  grid grid-flow-col grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8 mt-5 2xl:grid-cols-4">
        <div className=" text-center hidden md:block col-span-1 ">
          {!userInformation.isLoading && (
            <User data={userInformation.data.data} parent="Home" />
          )}
        </div>
        <div className=" text-center  col-span-1  2xl:col-span-2">
          {/* <CreatePost /> */}
          <Posts data={data?.data} isLoading={isLoading} parent="Home" />
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
