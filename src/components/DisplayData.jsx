import { useEffect, useState, useCallback} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTaskContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";
import TaskDetails from "./TaskDetails";
import RenderUpdateForm from "./RenderUpdateForm";
import Loader from "./Loader";
import EmptyList from "./EmptyList";

const DisplayData = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, userToken } = useAuthContext();
  const { tasks, setTasks } = useTaskContext();

  //State hooks for the update functionality
  const [isUpdating, setIsUpdating] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState({
    title: "",
    description: "",
  });
  
  //fetch data from API to render todo-list
  const fetchData = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.get("https://backend-todo-app-zd2a.onrender.com/api/todoapp", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.error;
      console.log(errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  },[setTasks, userToken]);

  useEffect(() => {
    if (!userToken) {
      setError("You must be logged in");
    }
    if (userToken) {
      fetchData();
    }
  }, [userToken, fetchData]);

  //Delete a Task
  const onDelete = (_id) => {
    if (!user) {
      return;
    }
    axios
      .delete(`https://backend-todo-app-zd2a.onrender.com/api/todoapp/${_id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(res.data.message);
        const updatedTasks = (data) => data.filter((task) => task._id !== _id);
        setTasks(updatedTasks); // To be able to update state with the remaining tasks
        toast.info("Task deleted successfully!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => console.log(err.response.data.error));
  };

  //Update Task
  //handleChange
  const handleChange = (e) => {
    setTaskToUpdate({ ...taskToUpdate, [e.target.name]: e.target.value });
    console.log(`aqui te cargo el state`);
  };

  //fetch the task to update

  const fetchTaskToUpdate= useCallback(()=>{
    axios
      .get(`https://backend-todo-app-zd2a.onrender.com/api/todoapp/${isUpdating}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setTaskToUpdate({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  },[isUpdating, userToken]);
  
  useEffect(() => {
    fetchTaskToUpdate();
  }, [isUpdating, fetchTaskToUpdate]);

  const updateItem = (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    axios
      .put(`https://backend-todo-app-zd2a.onrender.com/api/todoapp/${isUpdating}`, taskToUpdate, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        console.log(
          `esta es la vaina actualizada que yo ando enviando a la db: ${taskToUpdate.title}`
        );

        //update the task in the state, using map https://bobbyhadz.com/blog/react-update-object-in-array#update-an-object-in-an-array-in-react-state
        const newState = tasks.map((task) => {
          if (task._id === isUpdating) {
            return {
              ...task,
              title: taskToUpdate.title,
              description: taskToUpdate.description,
            };
          }
          return task;
        });
        setTasks(newState);
        console.log(`cambio el estado,`, tasks);
        toast.success("Task updated successfully!✨", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTaskToUpdate({ title: "", description: "" });
        setIsUpdating("");
      })

      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <div
      className={
        tasks.length === 0
          ? "sm:flex sm:justify-center sm:h-fit"
          : ""
          ? isLoading
          : "sm:w-full h-full items-center"
          ? tasks.length === 0
          :"sm:w-full h-full items-center"
      }
    >
      {error ? (
        <div className="flex items-center justify-center mt-5 sm:mt-10 sm:text-xl py-5 rounded-xl text-red-700 dark:text-red-500 font-bold border border-red-700 sm:w-4/5 ring-2 ring-red-500">
          {error}
        </div>
      ) : tasks.length > 0 ? (
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="my-8 sm:my-0 drop-shadow-lg  bg-specialGray-100 rounded-xl p-5 dark:bg-purply-800"
            >
              {isUpdating === task._id ? (
                <RenderUpdateForm
                  updateItem={updateItem}
                  taskToUpdate={taskToUpdate}
                  handleChange={handleChange}
                /> // renders el form que creaste para actualizar la tarea en cuestión
              ) : (
                <>
                  <TaskDetails
                    task={task}
                    onDelete={onDelete}
                    setIsUpdating={setIsUpdating}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <EmptyList />
      )}

      <ToastContainer />
    </div>
  );
};

export default DisplayData;
