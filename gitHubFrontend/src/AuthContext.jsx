import {createContext, useState, useEffect, useContext} from "react";

const AuthContext = createContext();

const useAuth = () =>{
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if(userId){
      setCurrentUser(userId);
    }else{
      setCurrentUser(null);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser, }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContextProvider, useAuth};