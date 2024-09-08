import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../services/state/hooks";
import { getImageAddress } from "../../utils/getImageAddress";
function HomeNav() {
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

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
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;
