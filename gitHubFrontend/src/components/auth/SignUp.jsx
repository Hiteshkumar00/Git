import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import {useAuth} from "../../AuthContext.jsx";

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";
import "./auth.css";

import { Link } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try{
      const BACKEND_URL = "http://localhost:3030";
      const res = await axios.post(`${BACKEND_URL}/signup`, {username, email, password});
    
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('token', res.data.token);

      setCurrentUser(res.data.userId);
      navigate("/");
    }catch(error){
      console.error("Error signing up", error);
      alert(error.response.data.message || "Signup failed!");a
    }

    setLoading(false);
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
                <PageHeader.Title>Sign Up</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(event)=> setUsername(event.target.value)}
            />
          </div>

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
            onClick={handleSignup}
          >
            {loading ? "Loading...": "Signup"}
          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
