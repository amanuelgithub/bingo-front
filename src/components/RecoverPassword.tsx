import React from "react";
import Button from "./form/Button";
import TextField from "./form/TextField";
export default function RecoverPassword() {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute left-0 top-0 h-1/2 w-full bg-blue-600" />
      <div className="absolute left-0 top-1/2 h-1/2  w-full bg-gray-200" />

      {/* form */}
      <div className="absolute w-5/6 rounded-md bg-white p-4 shadow-md sm:w-3/4 lg:w-4/12 ">
        {/* header */}
        <h1 className="mb-4 mt-2 text-center text-xl font-bold sm:mb-5 sm:text-2xl md:text-3xl">
          Recover Password
        </h1>
        {/* form */}
        <form>
          {/* <TextField placeholder="New Password" className="my-2" /> */}
          {/* <TextField placeholder="Confirm Password" className="my-2" /> */}
          <TextField placeholder="New Password" className="my-2" />
          <TextField placeholder="New Password" className="my-2" />
          <Button className="mt-2 w-full">Recover</Button>
        </form>
      </div>
    </div>
  );
}
