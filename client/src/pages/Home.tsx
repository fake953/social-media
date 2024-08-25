import {
  // CreatePost,
  Friends,
  Ads,
  Posts,
  User,
  HomeNav,
} from "../components/homeComponents";

import { useEffect } from "react";

const Home = () => {
  useEffect(() => {}, []);

  return (
    <div className=" ">
      <HomeNav />
      <div className="container	mx-auto w-full px-12 grid grid-flow-col grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8 mt-5 2xl:grid-cols-4">
        <div className=" text-center hidden md:block col-span-1 ">
          <User />
        </div>
        <div className=" text-center   col-span-1 2xl:col-span-2">
          {/* <CreatePost /> */}
          <Posts />
        </div>
        <div className=" text-center hidden xl:block xl:col-span-1">
          <Ads />
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Home;
