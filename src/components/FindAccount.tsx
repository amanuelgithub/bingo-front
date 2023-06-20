import React from "react";
import TextField from "./form/TextField";
import Button from "./form/Button";

export default function FindAccount() {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute left-0 top-0 h-1/2 w-full bg-blue-600" />
      <div className="absolute left-0 top-1/2 h-1/2  w-full bg-gray-200" />

      {/* form */}
      <div className="absolute w-5/6 rounded-md bg-white p-4 shadow-md sm:w-3/4 lg:w-4/12">
        {/* header */}
        <h1 className="mb-4 mt-2 text-center text-xl font-bold sm:mb-5 sm:text-2xl md:text-3xl">
          Find My Account
        </h1>
        {/* form */}
        <form>
          <TextField placeholder="Email Address" className="my-2" />
          <Button className="mt-2 w-full">Find</Button>
        </form>
      </div>
    </div>
  );
}
