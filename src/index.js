import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//Context API's related importations
import { TasksProvider } from "./context/TasksContext";
import { AuthProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>
);
