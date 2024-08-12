import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import Post from "./pages/Post";

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
  return (
    <div className="bg-black h-full min-h-screen text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
