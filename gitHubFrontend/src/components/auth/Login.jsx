import { useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from "../../AuthContext.jsx";

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import "./auth.css";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  
  const {setCurrentUser} = useAuth();

  useEffect(()=> {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUser(null);
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try{
      setLoading(true);
      const BACKEND_URL = "http://localhost:3030";

      const res = await axios.post(`${BACKEND_URL}/login`, {email, password});
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);
      setCurrentUser(res.data.userId);
      setLoading(false);
      navigate("/");
    }catch(error){
      console.error("Loging Error: ", error);
      setLoading(false);
      alert(error.response.data.message || "Login failed!");
    }
  };

  

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={"assets/github-mark-white.svg"} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title>Sign In</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>
        <div className="login-box">
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(event)=> setEmail(event.target.value)}
            />
          </div>
          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading? "Loading..." : "Login"}
          </Button>
        </div>
        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
