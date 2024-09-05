import { getImageAddress } from "../utils/getImageAddress";
import { useUpdateUserFriendsListMutation } from "../services/api/apiQuery";
import { useAppDispatch, useAppSelector } from "../services/state/hooks";
import { UserMinesIcon } from "../components/icons";
import { setUserFriends } from "../services/state/userSlice";

type UpdateUserFriendsType = {
  id: string;
  friendId: string;
  secret: string;
};
type FriendsType = {
  first_name: string;
  last_name: string;
  location: string;
  occupation: string;
  picturePath: string;
  _id: string;
};
type Props = {
  data: FriendsType[] | null;
  parent: string;
};
const Friends = ({ data, parent }: Props) => {
  const [updateUserFriendsList] = useUpdateUserFriendsListMutation();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.user);

  const handelUpdateUserFriends = async ({
    id,
    friendId,
    secret,
  }: UpdateUserFriendsType) => {
    try {
      const res = await updateUserFriendsList({ id, friendId, secret });

      dispatch(setUserFriends(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  if (!token || !user) return;
  return (
    <div className="bg-card rounded-md p-4 mt-8 ">
      <h1 className="text-start">Friends List</h1>
      <ul>
        {data?.map((f) => (
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
            {parent === "Home" && (
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
                <UserMinesIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
