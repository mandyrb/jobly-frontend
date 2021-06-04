import React, {useState, useContext, useEffect} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';
import UserContext from "../UserContext";
import LoadingSpinner from "../LoadingSpinner";
import "./ProfileForm.css";

function ProfileForm({updateProfile}){
    let user = useContext(UserContext);
    const initial_state = {firstName: "", lastName:"", email:"", password:""}
    const [formData, setFormData] = useState(initial_state);
    // const [formData, setFormData] = useState({firstName: user.firstName, lastName:user.lastName, email:user.email, password:""});

    const [invalidMessage, setInvalidMessage] = useState(false); 
    const history = useHistory(); 

    // setTimeout(function(){
    //     setFormData({firstName: user.firstName, lastName:user.lastName, email:user.email, password:""});
    // }, 3000);

    // useEffect(() => {
    //     setFormData({firstName: user.firstName, lastName:user.lastName, email:user.email, password:""});
    // }, [user]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(formData).includes("")) {
            setInvalidMessage(true);
            return;
        }
        let passwordValid = await updateProfile(user.username, formData.password, formData.firstName, formData.lastName, formData.email);
        if (passwordValid){
            history.push('/');
        }
        else setInvalidMessage(true)
    }

    if (!user) {
        return <LoadingSpinner />
    }
    // setFormData({firstName: user.firstName, lastName:user.lastName, email:user.email, password:""});

    return(
        <Container>
        <Form className="signup-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="username">Username</Label>
                <h5>{user.username}</h5>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" defaultValue={user.firstName} onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="lastName">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" defaultValue={user.lastName}onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="email">Email</Label>
                <Input type="email" name="email" id="email" defaultValue={user.email} onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Button color="primary">Submit</Button>
                </FormGroup>
                <br></br>
                {invalidMessage && <h6>All fields are required</h6>}
                <br></br>
                <br></br>
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default ProfileForm;