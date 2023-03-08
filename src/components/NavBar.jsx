import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdWbSunny, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTaskContext } from "../context/TasksContext";
const NavBar = () => {
  const [theme, setTheme] = useState(null);
  
  //set theme based on browser preferences
  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    if (
      userTheme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  //change theme based on the event of clicking the button
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { userToken, setUserToken, setUser } = useAuthContext();
  const { setTasks } = useTaskContext();
  const navigate = useNavigate();

  //logout function

  const onLogout = () => {
    setUserToken(null);
    setUser(null);
    setTasks([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("login");
  };

  return (
    <div className="flex justify-end items-center pt-5 font-semibold sm:text-xl text-base">
      {!userToken && (
        <div className="flex items-center ">
          <NavLink to="/login" className=" px-1 sm:px-3">
            Login
          </NavLink>
          <NavLink to="/register" className="px-1  sm:px-3">
            Register
          </NavLink>
        </div>
      )}

      {userToken && (
        <div>
          <button
            onClick={onLogout}
            className="border border-purply-900 dark:border-specialGray-200 px-4 py-2 mr-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}

      <div className="flex items-center">
        <button
          className="font-bold dark:text-specialGray-100 text-3xl pl-2 pr-3 sm:pr-10 flex items-center"
          onClick={handleThemeSwitch}
        >
          {theme === "dark" ? <MdWbSunny /> : <MdDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
