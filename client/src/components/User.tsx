import linkedin from "../assets/linkedin.png";
import twitter from "../assets/twitter.png";

import { getImageAddress } from "../utils/getImageAddress";
import { BagIcon, LocationIcon, PenIcon, UserIcon } from "./icons";
import { userType } from "../services/state/userSlice";
type Props = {
  data: userType;
  parent: string;
};
const User = ({ data }: Props) => {
  return (
    <div>
      {!data ? (
        <div className="grid h-full max-h-[300px] min-h-[160px] w-full max-w-xs animate-pulse place-items-center rounded-lg bg-card"></div>
      ) : (
        <div color="gray" className="py-4 px-4 rounded-md  bg-card">
          <header className="flex justify-between items-center border-b border-gray-600 pb-3">
            <div className="flex items-center">
              {" "}
              <img
                src={getImageAddress(data.picturePath)}
                alt="user photo"
                className="w-11 h-11 object-cover rounded-full mr-3"
              />
              <div className="">
                <h1 className="text-md ">
                  {data.first_name} {""} {data.last_name}
                </h1>
                <h6 className="text-sm text-start font-thin text-gray-400">
                  {data.friends.length} Friends
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
                  {data.location}
                </h6>
              </div>
              <div className="flex justify-start gap-4 my-3">
                <BagIcon />
                <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                  {data.occupation}
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
                  <h6 className="font-thin  pt-0.5">{data.viewedProfile}</h6>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="font-thin text-sm pt-0.5 text-gray-400">
                    Impressions of your post
                  </h6>
                  <h6 className="font-thin  pt-0.5">{data.impressions}</h6>
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
