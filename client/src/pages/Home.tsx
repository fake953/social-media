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
  useEffect(() => {}, []);

  return (
    <div>
      <HomeNav />
      <div className="w-full px-12 grid grid-flow-col grid-cols-4 gap-8 mt-5">
        <div className=" text-center col-span-1">
          <User />
        </div>
        <div className=" text-center col-span-2">
          <CreatePost />
          <Posts />
        </div>
        <div className=" text-center col-span-1">
          <Ads />
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Home;
