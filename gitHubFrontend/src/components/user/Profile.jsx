import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import { useAuth } from "../../authContext";

import HeatMapComp from "./HeatMapComp";

const Profile = () => {
  const BACKEND_URL = "http://localhost:3030";
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({name: "username", following: []});
  const { currentUser } = useAuth();


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    const fetchUserDetails = async () => {
      try{  
        const res = await axios.get(`${BACKEND_URL}/getUser/${userId}`);
        setUserDetails(res.data);
        console.log(res.data);
      }catch(error){
        console.error("Error fetching user details", error);
      }
    };
    userId ? fetchUserDetails(): navigate("/auth");
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile">
        <UnderlineNav aria-label="Repository">
          <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
          >
            Overview
          </UnderlineNav.Item>

          <UnderlineNav.Item
            onClick={() => navigate("/profile")}
            icon={RepoIcon}
          >
            Starred Repositories
          </UnderlineNav.Item>
        </UnderlineNav>


        <div className="profile-page-wrapper">
          <div className="user-profile-section">
            <div className="profile-image"></div>

            <div className="name">
              <h3>{userDetails.username}</h3>
            </div>

            <button className="follow-btn">Follow</button>

            <div className="follower">
              <p>10 Followers</p>
              <p>{userDetails.following.length} Followed</p>
            </div>
          </div>

          <HeatMapComp />
        </div>
        
      </div>
    </>
  );
};

export default Profile;
