import "./Dashboard.css";

import Navbar from "../Navbar";

import {useState, useEffect} from "react";

import axios from "axios";


function Dashboard() {
  const BACKEND_URL = "http://localhost:3030";

  const [repositories, setRepositories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedRepos, setSearchedRepos] = useState([]);

  const [suggestedRepos, setSuggestedRepos] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchAllReposByUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/repo/user/${userId}`);
        setRepositories(res.data); 
        setSearchedRepos(repositories);
      } catch (error) {
        console.error("Error fetching repositories", error);
      }
    };
    const fetchSuggestedRepos = async () => {
      try{
        const res = await axios.get(`${BACKEND_URL}/repo/all`);
        setSuggestedRepos(res.data);
      }catch(error){
        console.error("Error fetching suggested repositories", error);
      }
    };

    if (userId) {
      fetchAllReposByUser();
      fetchSuggestedRepos();
    }
  }, []);

  useEffect(() => {
    if(searchQuery == ""){
      setSearchedRepos(repositories);
    }else{
      const filteredRepos = repositories.filter( repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()) );
      setSearchedRepos(filteredRepos);
    }
  }, [searchQuery, searchedRepos, repositories]);


  console.log("repositories", repositories);
  console.log("suggestedRepos", suggestedRepos);

  return (  
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {
            suggestedRepos.map(repo => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          }
        </aside>

        <main>
          <h3>Your Repositories</h3>
          <div id="search">
            <input 
              value={searchQuery} 
              onChange={(event) => setSearchQuery(event.target.value)} 
              type="text"
              placeholder="search repositories..."
            />
          </div>
            {
              searchedRepos.map(repo => (
                <div key={repo._id}>
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </div>
              ))
            }
        </main>

        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>Tech Confference - Dec 15</li>
            <li>Developer Meetup - March 13</li>
            <li>React Summit - Jan 5</li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;