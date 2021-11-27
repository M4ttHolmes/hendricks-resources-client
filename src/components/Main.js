import React, { useEffect, useState } from "react";
import {Table, Button} from "reactstrap"

const Main = () => {
    const [resources, setResources] = useState([]);

    const getAllResources = () => {
        console.log("GetAllResources Function Called");
        
        // fetch(`${APIURL}/resource`, {
        fetch(`http://localhost:5000/resource`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResources(data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllResources();
      }, []);

    
    return(
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Resource</th>
                        <th>Owner</th>
                        <th>Location</th>
                        <th>Last Activity</th>
                    </tr>
                </thead>

                <tbody>

                    {resources.map((resource, key) => {
                        return(
                            <tr key={key}>
                                <td>
                                    <Button disabled outline color="success">Check In</Button>
                                    <Button color="danger">Check Out</Button>

                                    {/* {resource.checkedOut} */}
                                </td>
                                <td>{resource.name}</td>
                                <td>{resource.owner}</td>
                                <td>{resource.location}</td>
                                <td>{new Date(resource.updatedAt).toLocaleDateString("en-US")}</td>
                                {/* <td><Button style={{paddingTop: "0px", paddingBottom: "0px"}} color="danger" onClick={() => props.deleteAdv(resource.id)}>Delete</Button></td> */}
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </div>
    )
}


export default Main