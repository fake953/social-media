import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";
import { useAppSelector } from "../../services/state/hooks";

import { useGetUserInformationQuery } from "../../services/api/apiQuery";

import { getImageAddress } from "../../utils/getImageAddress";
import { BagIcon, LocationIcon, PenIcon, UserIcon } from "../icons";
const User = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetUserInformationQuery({
    id: user?._id,
    secret: token,
  });

  if (isError || data === undefined)
    <h6 className="text-red-700">something went wrong</h6>;
  return (
    <div>
      {isLoading ? (
        <div className="grid h-full max-h-[300px] min-h-[160px] w-full max-w-xs animate-pulse place-items-center rounded-lg bg-gray-900"></div>
      ) : (
        <div color="gray" className="py-4 px-4 rounded-md  bg-gray-900">
          <header className="flex justify-between items-center border-b border-gray-600 pb-3">
            <div className="flex items-center">
              {" "}
              <img
                src={getImageAddress(data.data.picturePath)}
                alt="user photo"
                className="w-11 h-11 object-cover rounded-full mr-3"
              />
              <div className="">
                <h1 className="text-md ">
                  {data.data.first_name} {""} {data.data.last_name}
                </h1>
                <h6 className="text-sm text-start font-thin text-gray-400">
                  {data.data.friends.length} Friends
                </h6>
              </div>
            </div>
            <div>
              <UserIcon />
            </div>
          </header>

          <main>
            <section className="border-b border-gray-600">
              {" "}
              <div className="flex justify-start gap-4 my-3">
                <LocationIcon />
                <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                  {data.data.location}
                </h6>
              </div>
              <div className="flex justify-start gap-4 my-3">
                <BagIcon />
                <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                  {data.data.occupation}
                </h6>
              </div>
            </section>
            <section className="border-b border-gray-600">
              {" "}
              <div className="py-3">
                <div className="flex justify-between items-center">
                  <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                    Who's viewed your profile
                  </h6>
                  <h6 className="font-thin  pt-0.5">
                    {data.data.viewedProfile}
                  </h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                    Impressions of your post
                  </h6>
                  <h6 className="font-thin  pt-0.5">{data.data.impressions}</h6>
                </div>
              </div>
            </section>
          </main>
          <footer className="py-3 text-start">
            <h1>Social Profiles</h1>
            <div className="mt-3 flex justify-between">
              <div className="flex">
                <div className="h-8 w-8  pt-2 ">
                  <img src={twitter} alt="twitter logo" />
                </div>
                <div className="ml-2">
                  <h1 className="text-md font-light ">Twitter</h1>
                  <h6 className="text-sm text-start font-thin text-gray-400">
                    Social Network
                  </h6>
                </div>
              </div>
              <div className="pt-2">
                <PenIcon />
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="flex">
                <div className="h-8 w-8  pt-2 ">
                  <img src={linkedin} alt="linkedin logo" />
                </div>
                <div className="ml-2">
                  <h1 className="text-md font-light ">Linkedin</h1>
                  <h6 className="text-sm text-start font-thin text-gray-400">
                    Network Platform
                  </h6>
                </div>
              </div>
              <div className="pt-2">
                <PenIcon />
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default User;
