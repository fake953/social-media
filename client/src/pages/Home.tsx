import {
  CreatePost,
  Friends,
  Ads,
  Posts,
  User,
  HomeNav,
} from "../components/home";

import { useEffect } from "react";

const Home = () => {
  // const token = useAppSelector((state) => state.user.token);
  // console.log(token);

  useEffect(() => {}, []);

  return (
    <div>
      <HomeNav />
      <div className="w-full px-12 grid grid-flow-col grid-cols-7 gap-4 mt-5">
        <div className=" text-center col-span-2">
          <User />
        </div>
        <div className=" text-center col-span-3">
          <CreatePost />
          <Posts />
        </div>
        <div className=" text-center col-span-2">
          <Ads />
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Home;
