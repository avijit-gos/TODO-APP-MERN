/** @format */
/** @format */

import React from "react";
import { createContext, useContext } from "react";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [updatedTask, setUpdatedTask] = React.useState(false);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        updatedTask,
        setUpdatedTask,
        tasks,
        setTasks,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const GlobalContext = () => {
  return useContext(ChatContext);
};

export default ChatContextProvider;
