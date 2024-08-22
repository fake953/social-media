import { Navbar, Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

import { SunIcon } from "../icons";
function HomeNav() {
  const navigate = useNavigate();
  return (
    <Navbar className=" border-none bg-gray-900" fullWidth>
      <div className="flex justify-between px-20">
        <div>
          <h2 className="text-xl" onClick={() => navigate("/")}>
            Minipedia
          </h2>
        </div>
        <div className="flex justify-between ">
          <div>
            <Button
              onClick={() => navigate("/auth/login")}
              size="sm"
              variant="gradient"
              className="mr-5"
            >
              log in
            </Button>
            <Button
              onClick={() => navigate("/auth/register")}
              size="sm"
              variant="gradient"
            >
              sign in
            </Button>
          </div>
          <div className="size-6 inline pl-6 pt-1">
            <SunIcon />
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default HomeNav;
