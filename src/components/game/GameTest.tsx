import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

function GameTest() {
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // Send a message to the server
  const sendMessage = (value: string) => {
    socket?.emit("game", value);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("game", messageListener);

    return () => {
      socket?.off("game", messageListener);
    };
  }, [messageListener]);

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="button" onClick={() => sendMessage(message)}>
        Send
      </button>
    </div>
  );
}

export default GameTest;
