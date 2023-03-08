
import { createContext, useContext, useState } from "react";
export const TaskContext = createContext();



//custom hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
   
  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  )
};
