import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

import { useRegisterUserMutation } from "../../services/api/apiQuery";
import { formFields, schema } from "../../utils/RegisterUtils";
import { useAppDispatch } from "../../services/state/hooks";
import { setLogin } from "../../services/state/userSlice";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/localStorageSetter";
import Navbar from "../../components/Navbar";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const [registerUser] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<formFields> = async (userInfo) => {
    userInfo.picturePath = acceptedFiles[0].path!;

    try {
      const {
        data: { data },
      } = await registerUser(userInfo);
      const token = {
        value: data.token,
        itemName: "token",
      };
      const user = {
        value: JSON.stringify(data.savedUser),
        itemName: "user",
      };
      setItemToLocalStorage(token);
      setItemToLocalStorage(user);
      dispatch(setLogin({ user: data.savedUser, token: data.token }));
      reset();
      navigate("/");
    } catch {
      setError("root", {
        message: `some thing went wrong please try agin later!`,
      });
    }
  };
  useEffect(() => {
    const storedToken = getItemFromLocalStorage("token");

    if (storedToken) navigate("/");
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" min-h-screen h-full flex justify-center items-center ">
        <div color="gray" className="py-6 px-8 bg-card rounded-lg	">
          <h2 className=" text-cyan-300 text-2xl font-medium">
            Welcome to Minipedia !{" "}
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              {formFields.map((f, index) => (
                <div key={index} className="pt-1">
                  <input
                    {...register(f.registerValue)}
                    placeholder={f.value}
                    type="text"
                    id="floating_standard"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  />
                </div>
              ))}
            </div>
            <div>
              <div
                {...getRootProps()}
                className=" border border-white pl-5 p-3 bg-gray-800 mt-3 cursor-pointer"
              >
                <input
                  {...getInputProps()}
                  id="picture"
                  color="white"
                  {...register("picturePath")}
                  className="pt-5 pl-3"
                />
                <p>
                  {acceptedFiles[0]?.name
                    ? acceptedFiles[0]?.name
                    : "Profile photo"}
                </p>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-6 btn w-full"
            >
              {isSubmitting ? "loading ..." : "sign up"}
            </button>
            <h2 color="gray" className="mt-4  text-center font-normal">
              Already have an account?{" "}
              <NavLink to={"/auth/login"} className="font-medium text-cyan-300">
                login
              </NavLink>
            </h2>
          </form>
          {Object.values(formFields).map((field, i) => (
            <h2 key={i} className="text-red-400">
              {errors?.[formFields[i].registerValue]?.message}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
