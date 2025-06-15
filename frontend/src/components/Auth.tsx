import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "./InputField";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { MailIcon, LockIcon, UserIcon } from "../icons/index"; // your custom SVGs as components


interface SigninInput {
  name?: string;
  username: string;
  password: string;
}
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [ postInput,setPostInput] = useState<SigninInput>({
    name:"",
    username:"",
    password:""
  });

  const sendRequest =async()=>{
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput);
      const jwt = res.data.jwt;
      if(!jwt){
        throw new Error ("Token is undefined in response");
      }
      localStorage.setItem("token",jwt)
      navigate('/dashboard');
    } catch (error) {
       if (axios.isAxiosError(error)) {
         console.error("Axios error:", error.response?.data);
         alert(`Error: ${error.response?.data?.message || "Request failed"}`);
       } else {
         console.error("Unknown error:", error);
         alert("Unknown error occurred");
       }
    }
  }
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center ">
        <div>
          <div className="px-10">
            <div className="font-semibold text-4xl text-slate-600">
              Authentication Page
            </div>
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
          <div>
           {type === "signup" ? (<InputField
              icon={<UserIcon />}
              label="Email"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                })
              }
            />):null}
            <InputField
              icon={<MailIcon />}
              label="Email"
              placeholder="example@gmail.com"
              onChange={(e) =>
                setPostInput({
                  ...postInput,
                  username: e.target.value,
                })
              }
            />
            <InputField
              icon={<LockIcon />}
              label="Password"
              placeholder="sef23#$*gsrs"
              onChange={(e) =>
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-6 w-full text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
