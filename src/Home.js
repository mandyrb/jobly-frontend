import React, {useContext} from "react";
import {Button} from "reactstrap";
import UserContext from "./UserContext";
import "./Home.css";

function Home(){
    const user = useContext(UserContext);
    return(
        <div className="center">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place</p>
            {!user && 
            <div>
            <Button href="/login" className="home-buttons" color="primary">Log In</Button>
            <Button href="/signup" className="home-buttons" color="primary">Sign Up</Button>
            </div>
            }
            {user && <h3>Welcome {user.firstName}!</h3>}
        </div>
    )
}

export default Home;