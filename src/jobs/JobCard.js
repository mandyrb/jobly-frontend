import React, {useContext} from "react";
import {Card, CardBody, CardTitle, CardText, Form, Button} from "reactstrap";
import UserContext from "../UserContext";
import "./JobCard.css";

function JobCard({job, apply}){
    const user = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await apply(user.username, job.id);
    }

    return(
        <Card className = "job-card">
        <CardBody>
            <CardTitle className="job-card-title">{job.title}</CardTitle>
            <CardText>{job.companyName}</CardText>
            <CardText>Salary: ${job.salary}</CardText>
            <CardText>Equity: ${job.equity}</CardText>
            {user.applications.includes(job.id) ?
                <Button color="danger" className="apply-button" disabled>Applied</Button>
                :
                <Form onSubmit={handleSubmit}>
                    <Button color="danger" className="apply-button">Apply</Button>
                </Form>
            }
        </CardBody>
        </Card>
    )
}

export default JobCard;