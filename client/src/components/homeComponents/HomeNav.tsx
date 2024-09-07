import { useNavigate } from "react-router-dom";

import { MoonIcon } from "../icons";
import { SunIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../../services/state/hooks";
import { getImageAddress } from "../../utils/getImageAddress";
import { setMode } from "../../services/state/userSlice";
import { setItemToLocalStorage } from "../../utils/localStorageSetter";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";
function HomeNav() {
  const { user, mode } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const controlThemeIcon = () => {
    if (!mode || mode === "dark") {
      return <IconSunFilled color="black" />;
    } else {
      return <IconMoonFilled />;
    }
  };
  const addModeToLocalStorage = () => {
    dispatch(setMode());
    console.log(mode);

    setItemToLocalStorage({ value: mode, itemName: "mode" });
  };
  return (
    <nav className=" border-none h-16 bg-card px-5 lg:px-10 xl:px-20  pt-3.5 ">
      <div className="flex justify-between px-5 lg:px-10 xl:px-20">
        <div>
          <h2
            className="text-xl pt-1 text-copy-primary"
            onClick={() => navigate("/")}
          >
            Minipedia
          </h2>
        </div>
        <div className="flex justify-between ">
          {user ? (
            <img
              className="w-8 rounded-full h-8 object-cover cursor-pointer"
              src={getImageAddress(user.picturePath)}
              onClick={() => navigate(`/profile/${user._id}`)}
            />
          ) : (
            <div>
              <button
                onClick={() => navigate("/auth/login")}
                className="mr-5 btn px-5 py-2"
              >
                log in
              </button>
              <button
                className="btn btn px-3 py-2"
                onClick={() => navigate("/auth/register")}
              >
                sign in
              </button>
            </div>
          )}

          <div
            className="size-6 inline pl-6 pt-1 cursor-pointer text-copy-primary  rounded-full "
            onClick={() => addModeToLocalStorage()}
          >
            {controlThemeIcon()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;
