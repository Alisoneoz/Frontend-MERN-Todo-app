import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const [passwordShown, setPasswordShown] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const { setUser, setUserToken } = useAuthContext();
  const navigate = useNavigate();
 
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("https://backend-todo-app-zd2a.onrender.com/api/user/signup", data)
      .then((res) => {
        console.log(res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.token)); //you may choose the email too
        setUserToken(res.data.token);
        setUser(res.data);
        toast.success("✨Welcome to the app📝", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        reset();
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        console.log(errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 8000,
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
    <div className=" flex justify-center flex-col">
      <div className="flex items-center justify-center text-xl sm:text-3xl font-bold mb-5 sm:mb-8 mt-10">
        <h2 className="pr-1 sm:pr-3 dark:text-specialGray-200">
          Welcome to your
        </h2>

        <h2 className="px-1 py-2 sm:py-3 sm:px-4 bg-gradient-to-r from-orangish to-wine text-specialGray-100 rounded-xl text-center">
          To-Do List
        </h2>
        <h2 className="pl-1 sm:pl-2">App</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center mx-5 sm:mx-auto  py-14 px-4 sm:px-9 drop-shadow-lg  bg-specialGray-100 dark:bg-purply-800 opacity-95  rounded-2xl  sm:w-1/2 xl:w-1/3 font-semibold h-2/3"
      >
        <div className="text-center text-xl sm:text-2xl pb-3">Sign Up</div>
        <div className="flex flex-col mb-3">
          <label className="text-base sm:text-xl font-bold">Email</label>
          <input
            type="text"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            className="text-purply-900 w-full rounded-md mb-2 px-2 py-1"
          />

          {errors.email && (
            <p className="text-red-700 dark:text-red-500 font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>




        <div className="mb-3">
          <label className="texl-base sm:text-xl font-bold">User Name</label>
          <input
            type= "text" 
            name="username"
            {...register("username", {
              required: true,
              validate: {
                checkLength: (value) => value.length <= 15,
              },
            })}
            className="text-purply-900 w-full rounded-md px-2 py-1 mb-2"
          />
        </div>
        <div className="text-red-700 dark:text-red-500 font-semibold">
          {errors.username?.type === "required" && <p>User name is required</p>}
          {errors.username?.type === "checkLength" && (
            <p>Please add a shorter user name (max 15 characters)</p>
          )}

        </div>




        <div className="relative">
          <label className="text-base sm:text-xl font-bold">Password</label>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 8,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#.$*])/.test(
                    value
                  ),
              },
            })}
            className="text-purply-900 w-full rounded-md px-2 py-1 mb-2"
          />
          <div
            onClick={togglePasswordVisibility}
            className="absolute right-2 bottom-3 text-purply-800 text-2xl cursor-pointer"
          >
            {passwordShown ? <HiEyeOff /> : <HiEye />}
          </div>
        </div>
        <div className="text-red-700 dark:text-red-500 font-semibold">
          {errors.password?.type === "required" && <p>Password is required</p>}
          {errors.password?.type === "checkLength" && (
            <p>Password should be at least 8 characters long</p>
          )}
          {errors.password?.type === "matchPattern" && (
            <div>
              Password should contain at least:
              <li>A uppercase letter.</li>
              <li>A lowercase letter.</li>
              <li>A digit.</li>
              <li>A special symbol.</li>
            </div>
          )}
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="py-2 px-4 bg-gradient-to-r from-orangish to-wine text-specialGray-100 rounded-xl text-center font-bold hover:text-xl w-full"
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-center sm:justify-end items-center mt-5">
          <p className="mr-4 text-base">Already have an account?</p>
          <NavLink
            to="/login"
            className="drop-shadow-lg cursor-pointer px-2 py-2 mt-1 rounded-lg text-specialGray-200 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center sm:hover:text-xl text-sm w-1/2 sm:w-fit"
          >
            Log In
          </NavLink>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
