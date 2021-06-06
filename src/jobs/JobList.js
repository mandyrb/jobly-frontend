import React, {useState, useEffect} from "react";
import JoblyApi from "../api";
import {ListGroup} from "reactstrap";
import JobSearchForm from "./JobSearchForm";
import LoadingSpinner from "../LoadingSpinner";
import JobCard from "./JobCard";
import "./JobList.css";

function JobList({apply}){
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        async function getJobsList() {
            let result = await JoblyApi.getJobs();
            setJobs(result);
        }
        getJobsList();
    }, []);

    async function getJobsWithSearch(searchTerm) {
        let result = await JoblyApi.getJobsSearch(searchTerm);
        setJobs(result);
        return result.length;
    }

    if (!jobs) return <LoadingSpinner />
        return(
            <div>
                <JobSearchForm search={getJobsWithSearch}/>
                <ListGroup className = "job-list">
                    {jobs.map(job => (
                        <JobCard apply={apply} key={job.id} job={job}></JobCard>
                    ))}
                </ListGroup>
            </div>
        )
}

export default JobList;


