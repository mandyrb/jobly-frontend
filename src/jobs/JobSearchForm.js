import React, { useState } from "react";
import {Container, Form, FormGroup, Row, Col, Input, Button} from "reactstrap";
import "./JobSearchForm.css";

function JobSearchForm({search}){

    const initial_state = {jobSearch: ""}
    const [formData, setFormData] = useState(initial_state);
    const [notFoundMessage, setNotFoundMessage] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Object.values(formData).includes("")) {
            let length = await search(formData.jobSearch);
            if (length === 0) setNotFoundMessage(true);
            else{setNotFoundMessage(false)}
            setFormData(initial_state);
        }
    }

    return(
        <Container>
        <Form className="search-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <FormGroup>
                <Input type="text" name="jobSearch" id="jobSearch" placeholder="Enter Search Term..." onChange={handleChange}/>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <Button color="primary">Submit</Button>
                </FormGroup>
                </Col>
            </Row>
        </Form>
        {notFoundMessage && <h6>Sorry, no results were found!</h6>}
        </Container>
    )
}

export default JobSearchForm;

