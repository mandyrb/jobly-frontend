import {Route, Redirect, Switch} from "react-router-dom";
import Home from "../Home";
import LoginForm from "../user-auth/LoginForm";
import SignUpForm from "../user-auth/SignUpForm";
import ProfileForm from "../user-auth/ProfileForm";
import CompanyList from "../companies/CompanyList";
import Company from "../companies/Company";
import JobList from "../jobs/JobList";
import React from "react";

function Routes({loginUser, signupUser, updateProfile, apply}){

    const tokenFromLocalStorage = localStorage.getItem("token");

    return(

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
                    <Company apply={apply}/>
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/jobs" >
                {tokenFromLocalStorage ? 
                    <JobList apply={apply}/> 
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
    )
}

export default Routes;
