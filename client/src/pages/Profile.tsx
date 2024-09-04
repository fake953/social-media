import { useParams } from "react-router-dom";
import {
  useGetAllPostsQuery,
  useGetOtherUsersDetailQuery,
  useGetOtherUsersFriendsMutation,
} from "../services/api/apiQuery";
import Posts from "../components/Posts";
import User from "../components/User";

import { useEffect, useState } from "react";
// import { useAppSelector } from "../services/state/hooks";
import Friends from "../components/Friends";
const Profile = () => {
  const { id } = useParams<{ id: string }>();
  // const { user, token } = useAppSelector((state) => state.user);
  const [friends, setFriends] = useState(null);
  const { data, isLoading } = useGetAllPostsQuery(null);
  const [getOtherUsersFriends] = useGetOtherUsersFriendsMutation();
  const userDetail = useGetOtherUsersDetailQuery({ id });

  useEffect(() => {
    const friendsData = async () => {
      const res = await getOtherUsersFriends({
        id: id,
      });
      console.log(res);

      setFriends(res.data.data);
    };
    friendsData();
  }, [id, getOtherUsersFriends]);

  return (
    <div className="container	mx-auto w-full  grid grid-flow-col grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8 mt-5 2xl:grid-cols-4">
      <div className=" text-center hidden md:block col-span-1 ">
        {!userDetail.isLoading && (
          <User data={userDetail.data.data} parent="Profile" />
        )}

        <Friends data={friends} parent={"Profile"} />
      </div>

      <div className=" text-center  col-span-1  2xl:col-span-2">
        {/* <CreatePost /> */}
        <Posts data={data?.data} isLoading={isLoading} parent={"Profile"} />
      </div>
    </div>
  );
};

export default Profile;
