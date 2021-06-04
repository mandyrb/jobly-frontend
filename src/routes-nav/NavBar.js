import React, {useContext} from "react";
import { NavbarBrand, Navbar, Nav, NavItem, NavLink} from 'reactstrap';
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
                <NavLink href="/companies">Companies</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/jobs">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={logoutUser} href="/">Logout {user.username}</NavLink>
              </NavItem>
            </>
            :
            <>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
            </>
          }
          </Nav>
      </Navbar>
    </div>
    )
}

export default NavBar;

