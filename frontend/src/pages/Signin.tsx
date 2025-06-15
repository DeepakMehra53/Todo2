import React from "react";
import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 ">
      <div className="flex justify-center h-screen">
        <Auth type="signin" />
      </div>
      <div>
        <Quote />
      </div>
    </div>
  );
};
