import { useEffect, useState } from "react";
import clsx from "clsx";

import { socket } from "../socket";
import { Message } from "../typings";

type ChatListProps = {
  userName: string;
};

const ChatList = ({ userName }: ChatListProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("listMessages", (data: Message[]) => setMessages(data));

    const handleNewMessage = (newMessage: Message) =>
      setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.on("newMessageRes", handleNewMessage);

    return () => {
      socket.off("newMessageRes", handleNewMessage);
    };
  }, []);

  return (
    <div id="chat-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={clsx("message", message.userName === userName && "me")}
        >
          <p className="message-author">
            {message.userName === userName ? "me" : message.userName}
          </p>

          <p className="message-content">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
