import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTaskContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";

const CreateData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const { userToken } = useAuthContext();

  const { setTasks } = useTaskContext();
  const handleChange = (e) => {
    setNewTask((data) => ({ ...data, [e.target.name]: e.target.value }));
    setError("");
  };

 
  //handleSubmit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userToken) {
      setError("You must be logged in");
      return;
    }
    setError("");
    setIsLoading(true);
    const updatedListOfTasks = (previousTasks) => [...previousTasks, newTask];
    setTasks(updatedListOfTasks); //testing
    axios
      .post("https://backend-todo-app-zd2a.onrender.com/api/todoapp", newTask, {
        headers: {
          "Authorization": `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setNewTask({ title: "", description: "" });
        console.log(res.data.message, res.data.todo);
        setIsLoading(false);
        toast.success("Task added successfully!🎉", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div className="sm:m-4 bg-specialGray-200 dark:bg-purply-900 flex justify-center mx-auto">
      <form onSubmit={handleSubmit}>
        <label className="font-bold text-lg sm:text-xl ml-3">Title</label>
        <input
          name="title"
          value={newTask.title}
          type="text"
          onChange={handleChange}
          placeholder="Add a title"
          className="w-full drop-shadow  rounded-md p-1 mb-4 px-3 py-2 mt-1  text-purply-900 font-bold "
        />
        <label className="font-bold text-lg sm:text-xl ml-3">Description</label>

        <input
          name="description"
          value={newTask.description}
          type="text"
          onChange={handleChange}
          placeholder="Add a description"
          className="w-full rounded-md drop-shadow px-3 py-2 mb-2 mt-1 text-purply-900 font-bold"
        />
        {error && (
          <div className="font-bold dark:text-red-500 text-red-600">
            Sorry! There was an error: {error}
          </div>
        )}
        {isLoading === false ? (
          <button
            type="submit"
            className="drop-shadow-lg cursor-pointer px-4 py-3 mt-2 rounded-lg text-specialGray-200 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center w-full"
          >
            Create New Task
          </button>
        ) : (
          <p className="drop-shadow-lg cursor-pointer px-4 py-3 mt-2 rounded-lg text-specialGray-200 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center w-full">
            sending
          </p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateData;
