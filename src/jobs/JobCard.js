import React from "react";
import {Card, CardBody, CardTitle, CardText, Button} from "reactstrap";
import "./JobCard.css";

function JobCard({job}){
    return(
        <Card className = "job-card">
        <CardBody>
            <CardTitle className="job-card-title">{job.title}</CardTitle>
            <CardText>{job.companyName}</CardText>
            <CardText>Salary: ${job.salary}</CardText>
            <CardText>Equity: ${job.equity}</CardText>
            <Button color="danger" className="apply-button">Apply</Button>
        </CardBody>
        </Card>
    )
}

export default JobCard;