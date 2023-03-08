import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const UnAuthenticated = ({ children }) => {
  const { userToken } = useAuthContext()

  return !userToken ? children : <Navigate to={"/"} replace/>
}

export default UnAuthenticated