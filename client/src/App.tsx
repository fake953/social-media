import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import Post from "./pages/Post";

import { useAppDispatch } from "./services/state/hooks";
import { setLogin } from "./services/state/userSlice";
import { getItemFromLocalStorage } from "./hooks/token";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/Register",
    element: <Register />,
  },
  { path: "/posts", element: <Post /> },
]);

const App = () => {
  const token = getItemFromLocalStorage("token");
  const dispatch = useAppDispatch();
  if (token) dispatch(setLogin(token));
  return (
    <div className=" h-full min-h-screen bg_dark  ">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
