import { getImageAddress } from "../../utils/getImageAddress";
import {
  useGetUserFriendsQuery,
  useUpdateUserFriendsListMutation,
} from "../../services/api/apiQuery";
import { useAppDispatch, useAppSelector } from "../../services/state/hooks";
import { UserPlusIcon } from "../../components/icons";
import { setUserFriends } from "../../services/state/userSlice";

type UpdateUserFriendsType = {
  id: string;
  friendId: string;
  secret: string;
};
const Friends = () => {
  const [updateUserFriendsList] = useUpdateUserFriendsListMutation();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetUserFriendsQuery({
    id: user?._id,
    secret: token,
  });

  const handelUpdateUserFriends = async ({
    id,
    friendId,
    secret,
  }: UpdateUserFriendsType) => {
    try {
      const res = await updateUserFriendsList({ id, friendId, secret });

      dispatch(setUserFriends(res.data.data));
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  if (!token || !user) return;
  if (isLoading) return;
  return (
    <div className="bg-gray-900 rounded-md p-4 mt-8 ">
      <h1 className="text-start">Friends List</h1>
      <ul>
        {data.data.map((f) => (
          <li key={f._id} className="flex justify-between my-4">
            <div className="flex justify-between">
              <img
                src={getImageAddress(f.picturePath)}
                alt="friend img"
                className="w-11 h-11 object-cover rounded-full mr-3"
              />
              <div>
                <h1 className="text-md ">
                  {f.first_name} {""} {f.last_name}
                </h1>
                <h6 className="text-sm text-start font-thin text-gray-400">
                  {f.occupation}
                </h6>
              </div>
            </div>
            <div
              className="bg-gray-800 rounded-full w-7 h-7 pl-[2px] pt-[2px] cursor-pointer "
              onClick={() =>
                handelUpdateUserFriends({
                  id: user?._id || "",
                  friendId: f._id,
                  secret: token || "",
                })
              }
            >
              <UserPlusIcon />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
