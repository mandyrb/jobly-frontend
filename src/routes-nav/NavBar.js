import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem} from 'reactstrap';
import UserContext from "../UserContext";

function NavBar({logoutUser}){
    const user = useContext(UserContext);
    return(
    <div>
      <Navbar color="white" expand="md" >
          <Nav navbar>
          <NavbarBrand style={{"marginLeft": "10px"}} href="/">Jobly</NavbarBrand>
          {user ? 
            <>
              <NavItem>
                <NavLink className="nav-link" to="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/" onClick={logoutUser}>Logout {user.username}</NavLink>
              </NavItem>
            </>
            :
            <>
              <NavItem>
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          }
          </Nav>
      </Navbar>
    </div>
    )
}

export default NavBar;

