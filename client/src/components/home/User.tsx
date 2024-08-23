import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { useAppSelector } from "../../services/state/hooks";

import { useGetUserInformationQuery } from "../../services/api/apiQuery";

import { getImageAddress } from "../../utils/getImageAddress";
import { BagIcon, LocationIcon } from "../../components/icons";
const User = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetUserInformationQuery({
    id: user?._id,
    secret: token,
  });

  if (isError)
    <Typography variant="h6" color="red">
      something went wrong
    </Typography>;
  return (
    <div>
      {isLoading ? (
        <div className="grid h-full max-h-[300px] min-h-[160px] w-full max-w-xs animate-pulse place-items-center rounded-lg bg-gray-900"></div>
      ) : (
        <Card color="gray" className="py-4 px-5 rounded-md">
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
                <h6 className="text-sm text-start font-thin">
                  {data.data.friends.length} Friends
                </h6>
              </div>
            </div>
            <div>0</div>
          </header>

          <main>
            <div>
              <LocationIcon />
              <h6 className="font-thin text-sm">{data.data.location}</h6>
            </div>
            <div>
              <BagIcon />
            </div>
          </main>
          {/* <CardFooter></CardFooter> */}
        </Card>
      )}
    </div>
  );
};

export default User;
