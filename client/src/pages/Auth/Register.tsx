import { Card, Input, Button } from "@material-tailwind/react";

import { NavLink } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterUserMutation } from "../../services/api/apiQuery";
const schema = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type formFields = z.infer<typeof schema>;
const Register = () => {
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

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);
      reset();
    } catch (error) {
      console.log(error);

      setError("root", {
        message: `email has already taken!`,
      });
    }
  };

  return (
    <div className=" min-h-screen h-full flex justify-center items-center ">
      <Card color="gray" className="py-6 px-8	">
        <h2 className=" text-cyan-300 text-2xl font-medium">
          Welcome to Minimedia !{" "}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <h2 className="-mb-3">First Name</h2>
            <Input
              {...register("first_name")}
              size="lg"
              placeholder="John"
              // className="  focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <h2 className="-mb-3 ">Last Name</h2>
            <Input
              {...register("last_name")}
              size="lg"
              placeholder="Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <h2 className="-mb-3">Email</h2>

            <Input
              {...register("email")}
              size="lg"
              placeholder="john@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && (
              <h2 className="text-red-400">{errors.email.message}</h2>
            )}
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
            {errors.password && (
              <h2 className="text-red-400">{errors.password.message}</h2>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="mt-6 bg-cyan-300"
            fullWidth
          >
            {isSubmitting ? "loading ..." : "sign up"}
          </Button>
          <h2 color="gray" className="mt-4  text-center font-normal">
            Already have an account?{" "}
            <NavLink to={"/auth/login"} className="font-medium text-cyan-300">
              login
            </NavLink>
          </h2>
        </form>
        {errors.root && <h2 className="text-red-400">{errors.root.message}</h2>}
      </Card>
    </div>
  );
};

export default Register;
