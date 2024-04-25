import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { getActiveGame } from "../../util/localstorage";

function GameTest() {
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const { id: gameId } = getActiveGame();

  // Send a message to the server
  const sendMessage = (value: string) => {
    // socket?.emit("game", value);

    socket?.emit("joinRoom", gameId);

    // socket?.on(gameId, messageListener);
  };

  useEffect(() => {
    const newSocket = io("http://157.230.49.88:8001");
    // const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: any) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    // socket?.on("game", messageListener);
    // socket?.on(gameId, messageListener);
    socket?.on("joinedRoom", (room) => {
      console.log(room);
    });

    return () => {
      // socket?.off("game", messageListener);
      socket?.off("joinedRoom", messageListener);
    };
  }, [messageListener]);

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button type="button" onClick={() => sendMessage(message)}>
        Send
      </button>
    </div>
  );
}

export default GameTest;
