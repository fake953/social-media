import { LeftIcon } from "./icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="h-16 bg-card">
        <div className="flex justify-between px-5 lg:px-10 xl:px-20 pt-3.5">
          <h2 className="text-xl" onClick={() => navigate("/")}>
            Minipedia
          </h2>
          <div>
            <button onClick={() => navigate("/")} className=" flex btn">
              <LeftIcon /> <span className="mt-0.5 text lg">Home</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
