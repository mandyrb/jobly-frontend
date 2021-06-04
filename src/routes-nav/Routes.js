import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";
import Home from "../Home";
import LoginForm from "../user-auth/LoginForm";
import SignUpForm from "../user-auth/SignUpForm";
import ProfileForm from "../user-auth/ProfileForm";
import CompanyList from "../companies/CompanyList";
import Company from "../companies/Company";
import JobList from "../jobs/JobList";
import React from "react";

function Routes({loginUser, signupUser, updateProfile}){

    const tokenFromLocalStorage = localStorage.getItem("token");

    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" >
                <Home/>
            </Route>
            <Route exact path="/login" >
                <LoginForm loginUser={loginUser}/>
            </Route>
            <Route exact path="/signup" >
                <SignUpForm signupUser={signupUser}/>
            </Route>
            <Route exact path="/companies" >
                {tokenFromLocalStorage ? 
                    <CompanyList/> 
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/companies/:handle" >
                {tokenFromLocalStorage ? 
                    <Company/>
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/jobs" >
                {tokenFromLocalStorage ? 
                    <JobList/> 
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/profile" >
                {tokenFromLocalStorage ? 
                    <ProfileForm updateProfile={updateProfile}/> 
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
}

export default Routes;
