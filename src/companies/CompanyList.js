import React, {useState, useEffect} from "react";
import JoblyApi from "../api";
import {Card, CardBody, CardTitle, CardText, ListGroup, Button} from "reactstrap";
import CompanySearchForm from "./CompanySearchForm";
import LoadingSpinner from "../LoadingSpinner";
import "./CompanyList.css";

function CompanyList(){

    const [companies, setCompanies] = useState(null);

    async function getCompaniesList() {
        let result = await JoblyApi.getCompanies();
        setCompanies(result);
    }

    useEffect(() => {
        getCompaniesList();
    }, []);

    async function getCompaniesWithSearch(searchTerm) {
        let result = await JoblyApi.getCompaniesSearch(searchTerm);
        setCompanies(result);
        return result.length;
    }

    if (!companies) return <LoadingSpinner />

    return(
        <div>
            <CompanySearchForm search={getCompaniesWithSearch}/>
            <ListGroup className = "company-list">
            {companies.map(company => (
                <Card key={company.handle} className = "company-card">
                    <CardBody>
                        <CardTitle className="company-card-title">{company.name}</CardTitle>
                        <CardText>{company.description}</CardText>
                        <Button href={`/companies/${company.handle}`}>Learn More</Button>
                    </CardBody>
                </Card>

            ))}
            </ListGroup>
        </div>
    )
}

export default CompanyList;


