import React, {useState, useEffect} from "react";
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
      let user = await JoblyApi.getUser(username);
      setUser(user);
      return true;
    }
    catch{
      return false;
    }
  }

  async function signupUser(username, password, firstName, lastName, email){
    try{
      let token = await JoblyApi.signup(username, password, firstName, lastName, email);
      localStorage.setItem("token", token);
      setToken(token);
      JoblyApi.token = token;
      let user = await JoblyApi.getUser(username);
      setUser(user);
      return true;
    }
    catch{
      return false;
    }
  }

  async function updateProfile(username, password, firstName, lastName, email){
    try{
      await JoblyApi.login(username, password);
    }
    catch {
      return false
    }
    await JoblyApi.profileUpdate(username, firstName, lastName, email);
    let user = await JoblyApi.getUser(username);
    setUser(user);
    return true;
  }

  function logoutUser(){
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
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
  });

  return (
    <div className="App">
      <UserContext.Provider value={user}>
      <NavBar logoutUser={logoutUser}/>
      <Routes user={user} updateProfile={updateProfile} signupUser = {signupUser} loginUser={loginUser}/>
      </UserContext.Provider>
    </div>
  );
}

export default App;


