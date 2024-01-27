import {
  type FormEvent,
  type ChangeEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { socket } from "../socket";

type CreateChatFormProps = {
  userName: string;
};

const CreateChatForm = ({ userName }: CreateChatFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue) return;

    socket.emit("newMessage", { message: inputValue, userName });

    setInputValue("");
  };

  return (
    <form id="create-chat-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter Your Message"
        value={inputValue}
        onChange={handleChange}
      />

      <button type="submit">Send</button>
    </form>
  );
};

export default CreateChatForm;
