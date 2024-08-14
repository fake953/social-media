import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

import { useLoginUsrMutation } from "../../services/apiQuery";

type formFields = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
  } = useForm<formFields>();

  const [loginUser] = useLoginUsrMutation();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(`res`, res);
      reset();
    } catch (error) {
      console.log(error);

      setError("root", {
        message: `invalid email or password !`,
      });
    }
  };
  return (
    <div className=" min-h-screen h-full flex justify-center items-center ">
      <Card color="transparent" className="py-6 px-8">
        <Typography variant="h5" color="blue-gray">
          Welcome to Minimedia !{" "}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>

            <Input
              type="email"
              {...register("email")}
              size="lg"
              placeholder="john@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              {...register("password")}
              size="lg"
              placeholder="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-6"
            fullWidth
          >
            {isSubmitting ? "loading ..." : "sign up"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <NavLink
              to={"/auth/register"}
              className="font-medium text-gray-900"
            >
              register
            </NavLink>
          </Typography>
        </form>
        {errors.root && (
          <Typography className="text-red-400" variant="h6">
            {errors.root.message}
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default Login;
