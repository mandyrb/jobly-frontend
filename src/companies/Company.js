import React, {useState, useEffect} from "react";
import "./Company.css";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import JoblyApi from "../api";
import {ListGroup} from "reactstrap";
import JobCard from "../jobs/JobCard";

function Company({apply}){
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompanyDetail() {
            let result = await JoblyApi.getCompany(handle)
            setCompany(result);
        }
        getCompanyDetail();
    }, [handle]);

    if (!company) return <LoadingSpinner />

    return(
        <div>
            <div className = "company-heading">
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            <ListGroup className = "job-list">
                {company.jobs.map(job => (
                    <JobCard apply={apply} job={job} key={job.id}></JobCard>
                ))}
            </ListGroup>
        </div>
    )
}

export default Company;

