import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const Protected = ({ children }) => {
  const { userToken } = useAuthContext();
  const location = useLocation().pathname;

  return userToken ? (children) : (<Navigate to={"/login"} state={{from: location}} replace/>)
}

export default Protected