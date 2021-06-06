import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes-nav/Routes";
import NavBar from "./routes-nav/NavBar";
import JoblyApi from "./api";
import './App.css';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";

function App() {
  const[token, setToken] = useState(null);
  const[user, setUser] = useState(null);

  async function loginUser(username, password){
    try{
      let token = await JoblyApi.login(username, password);
      localStorage.setItem("token", token);
      setToken(token);
      JoblyApi.token = token;
      return true;
    }
    catch(e){
      return e;
    }
  }

  async function signupUser(username, password, firstName, lastName, email){
    try{
      let token = await JoblyApi.signup(username, password, firstName, lastName, email);
      localStorage.setItem("token", token);
      setToken(token);
      JoblyApi.token = token;
      return true;
    }
    catch(e){
      return e;
    }
  }

  async function updateProfile(username, password, firstName, lastName, email){
    try{
      await JoblyApi.login(username, password);
    }
    catch (e) {
      return e;
    }
    let user = await JoblyApi.profileUpdate(username, firstName, lastName, email);
    setUser(user);
    return true;
  }

  function logoutUser(){
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  async function applyToJob(username, jobId){
    let result = await JoblyApi.apply(username, jobId);
    let user = await JoblyApi.getUser(username);
    setUser(user);
    return result;
  }

  async function getUserDetails(token){
    JoblyApi.token = token;
    let { username } = jwt.decode(token);
    let user = await JoblyApi.getUser(username);
    setUser(user);
  }

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if(tokenFromLocalStorage){
      getUserDetails(tokenFromLocalStorage);
    }
  },[token]);

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={user}>
      <NavBar logoutUser={logoutUser}/>
      <Routes user={user} updateProfile={updateProfile} signupUser = {signupUser} loginUser={loginUser} apply={applyToJob}/>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;


