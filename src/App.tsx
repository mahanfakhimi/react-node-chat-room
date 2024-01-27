import { useEffect, useState } from "react";

import ChatList from "./components/ChatList";
import CreateChatForm from "./components/CreateChatForm";

const App = () => {
  const [userName, setUserName] = useState<null | string>(null);

  useEffect(() => {
    const userNamePrompt = prompt("Enter your user name: ");
    setUserName(
      userNamePrompt +
        "-" +
        Date.now().toString(36) +
        Math.random().toString(36).slice(2)
    );
  }, []);

  return (
    <div id="app-container">
      <ChatList userName={userName!} />
      <CreateChatForm userName={userName!} />
    </div>
  );
};

export default App;
