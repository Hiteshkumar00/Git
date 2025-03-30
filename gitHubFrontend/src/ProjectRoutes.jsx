import { useEffect } from "react";

import {useNavigate, useRoutes} from "react-router-dom";

//Pages
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/user/Profile.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";

import { useAuth } from './AuthContext.jsx';

const ProjectRoutes = () => {
  const {currentUser, setCurrentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const inUserId = localStorage.getItem('userId');
    if(inUserId && !currentUser){
      setCurrentUser(inUserId);
    }
    if(!inUserId && !['/auth', '/signup'].includes(window.location.pathname)){
      navigate('/auth');
    }
    if(inUserId && ['/auth', '/signup'].includes(window.location.pathname)){
      navigate('/');
    };
  }, [currentUser, navigate]);

  let elements = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },{
      path: "/auth",
      element: <Login />,
    },{
      path: "/signup",
      element: <Signup />,
    },{
      path: "/profile",
      element: <Profile />,
    }
  ]);

  return elements;
};

export default ProjectRoutes;