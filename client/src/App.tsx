import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import Profile from "./pages/Profile";

import { useAppDispatch, useAppSelector } from "./services/state/hooks";
import { setLogin, setMode } from "./services/state/userSlice";
import { getItemFromLocalStorage } from "./utils/localStorageSetter";
import { useGetUserInformationMutation } from "./services/api/apiQuery";
import { useEffect } from "react";
import alertFunction from "./utils/alert";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Profile/:id",
    element: <Profile />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/Register",
    element: <Register />,
  },
]);

const App = () => {
  // const [Theme, setTheme] = useState("dark");
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.user);
  const [getUserInformation] = useGetUserInformationMutation();
  const Theme = getItemFromLocalStorage("mode");
  useEffect(() => {
    dispatch(setMode());
  }, [dispatch]);
  useEffect(() => {
    const token = getItemFromLocalStorage("token");
    const user = JSON.parse(getItemFromLocalStorage("user")!);
    try {
      if (token && user) {
        const setUser = async () => {
          const res = await getUserInformation({
            id: user._id,
            secret: token,
          });
          dispatch(setLogin({ user: res.data.data, token }));
        };
        setUser();
      } else {
        alertFunction("create post");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, getUserInformation]);

  return (
    <div className={`h-full min-h-screen ${Theme || mode}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
