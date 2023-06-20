import React from "react";
import TextField from "../form/TextField";
import Button from "../form/Button";

function CreateGame() {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <h1 className="mb-4 text-4xl font-bold">Create New Game</h1>

        <div>
          <form>
            <TextField type={"number"} placeholder="Money" className="my-2" />
            <Button className={"w-full"}>Create</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;
