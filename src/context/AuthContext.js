import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

//custom hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState(null)

  useEffect(()=>{
    const tokenOfSavedUser = JSON.parse(localStorage.getItem("token"))
    setUserToken(tokenOfSavedUser);
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser)   
  }, [])

  return(
    <AuthContext.Provider value={{user, setUser, userToken, setUserToken}}>
      {children}
    </AuthContext.Provider>
  ) 
};
