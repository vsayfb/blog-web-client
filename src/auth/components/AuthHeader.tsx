import { Link } from "react-router-dom";

export enum AuthType {
  SignUp = "SingUp",
  SingIn = "SignIn",
}

export default function AuthHeader({ type }: { type: AuthType }) {
  return (
    <>
      <p
        tabIndex={0}
        className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
      >
        {type === AuthType.SingIn
          ? "Login to your account"
          : "Create an account"}
      </p>
      <p
        tabIndex={0}
        className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
      >
        {type === AuthType.SingIn
          ? "Dont have account?"
          : "Already have an account?"}
        <Link
          to={type === AuthType.SingIn ? "/signUp" : "/signIn"}
          className="hover:text-gray-500 ml-2 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
        >
          {type === AuthType.SingIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </>
  );
}
