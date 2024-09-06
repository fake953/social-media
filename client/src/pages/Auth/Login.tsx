import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "@material-tailwind/react";
import { useState } from "react";

import { useLoginUsrMutation } from "../../services/api/apiQuery";
import { setItemToLocalStorage } from "../../utils/localStorageSetter";
import { useAppDispatch } from "../../services/state/hooks";
import { setLogin } from "../../services/state/userSlice";
import Navbar from "../../components/Navbar";

type formFields = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<formFields>();
  const [errors, setErrors] = useState<{ message: string } | null>(null);
  const [loginUser] = useLoginUsrMutation();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.error) setErrors(res.error?.data);
      const token = {
        value: res.data.data.token,
        itemName: "token",
      };
      const user = {
        value: JSON.stringify(res.data.data.savedUser),
        itemName: "user",
      };
      setItemToLocalStorage(token);
      setItemToLocalStorage(user);
      dispatch(
        setLogin({ user: res.data.data.savedUser, token: res.data.data.token })
      );
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);

      setErrors({
        message: `invalid email or password !`,
      });
    }
  };
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen h-full flex justify-center items-center ">
        <div className="py-6 px-8 bg-card	rounded-lg">
          <h2 className=" text-cyan-300 text-2xl font-medium">
            Welcome to Minipedia !{" "}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              />

              <input
                {...register("password")}
                placeholder="password"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-6 btn w-full"
            >
              {isSubmitting ? "loading ..." : "sign up"}
            </button>
            <h2 className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <NavLink
                to={"/auth/register"}
                className="font-medium text-cyan-300"
              >
                register
              </NavLink>
            </h2>
          </form>
          {errors && <h2 className="text-red-400">{errors.message}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Login;
