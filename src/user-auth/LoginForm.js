import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginForm({loginUser}){
    const initial_state = {username: "", password: ""}
    const [formData, setFormData] = useState(initial_state);
    const [invalidMessage, setInvalidMessage] = useState(false); 
    const history = useHistory(); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userExists = await loginUser(formData.username, formData.password);
        if (userExists){
            history.push('/');
        }
        else setInvalidMessage(true)
    }

    return(
        <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="username">Username</Label>
                <Input type="text" name="username" id="username" onChange={handleChange}/>
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
                {invalidMessage && <h6>Invalid username or password</h6>}
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default LoginForm;