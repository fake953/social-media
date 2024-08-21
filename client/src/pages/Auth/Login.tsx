import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button, Card, Input } from "@material-tailwind/react";
import { useState } from "react";

import { useLoginUsrMutation } from "../../services/api/apiQuery";

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
  } = useForm<formFields>();
  const [errors, setErrors] = useState<{ message: string } | null>(null);
  const [loginUser] = useLoginUsrMutation();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(`res`, res);
      reset();
    } catch (error) {
      console.log(error);

      setErrors({
        message: `invalid email or password !`,
      });
    }
  };
  return (
    <div className=" min-h-screen h-full flex justify-center items-center ">
      <Card className="py-6 px-8 bg-gray-900	">
        <h2 className=" text-cyan-300 text-2xl font-medium">
          Welcome to Minimedia !{" "}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <h2 className="-mb-3">Email</h2>

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

            <h2 className="-mb-3">Password</h2>
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
            className="mt-6 bg-cyan-300"
            fullWidth
          >
            {isSubmitting ? "loading ..." : "sign up"}
          </Button>
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
      </Card>
    </div>
  );
};

export default Login;
