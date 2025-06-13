import React from "react";
import { Link } from "react-router-dom";

export const Auth = ({type}:{type:"singup"|"signin"}) => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center ">
        <div>
          <div className="px-10">
            <div className="font-semibold text-4xl text-slate-600">
              Authentication Page
            </div >
            <div className="flex justify-center items-center font-mono">
              {type === "signin"
                ? "Don't have an account"
                : "Alread have an account"}
              <Link
                className="underline pl-2"  
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up " : "Sign in"}
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


