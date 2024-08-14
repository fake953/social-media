import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { NavLink } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegisterUserMutation } from "../../services/apiQuery";
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
      reset();
      const res = await registerUser(data);
      console.log(res);
    } catch (error) {
      console.log(error);

      setError("root", {
        message: `email has already taken!`,
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
              First Name
            </Typography>
            <Input
              {...register("first_name")}
              size="lg"
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
            <Input
              {...register("last_name")}
              size="lg"
              placeholder="Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>

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
              <Typography className="text-red-400" variant="h6">
                {errors.email.message}
              </Typography>
            )}
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
            {errors.password && (
              <Typography className="text-red-400" variant="h6">
                {errors.password.message}
              </Typography>
            )}
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
            Already have an account?{" "}
            <NavLink to={"/auth/login"} className="font-medium text-gray-900">
              login
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

export default Register;
