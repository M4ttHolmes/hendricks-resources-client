import React, { useEffect, useState } from "react";
import {Table, Button} from "reactstrap"
import CheckInResource from "./CheckInResource";
import CheckOutResource from "./CheckOutResource";
import CreateResource from "./CreateResource";
import APIURL from "../helpers/environment";

const Main = (props) => {
    const [resources, setResources] = useState([]);
    const [updatedResource, setUpdatedResource] = useState({})
    const [updateCheckIn, setUpdateCheckIn] = useState(false);
    const [updateCheckOut, setUpdateCheckOut] = useState(false);

    const editUpdateResource = (resourceId) => {
        setUpdatedResource(resourceId);
    }
    const checkInOn = () => {
        setUpdateCheckIn(true);
    }
    const checkInOff = () => {
        setUpdateCheckIn(false);
    }

    const checkOutOn = () => {
        setUpdateCheckOut(true);
    }
    const checkOutOff = () => {
        setUpdateCheckOut(false);
    }

    const getAllResources = () => {
        console.log("GetAllResources Function Called");
        
        fetch(`${APIURL}/resource`, {
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
            {props.createActive ? <CreateResource createOff={props.createOff} getAllResources={getAllResources}/> : <></>}
            {updateCheckIn ? <CheckInResource updatedResource={updatedResource} checkInOff={checkInOff} getAllResources={getAllResources}/> : <></>}
            {updateCheckOut ? <CheckOutResource updatedResource={updatedResource} checkOutOff={checkOutOff} getAllResources={getAllResources}/> : <></>}
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
                                {resource.checkedOut ? 
                                <td>
                                    <Button outline color="success" onClick={() => {editUpdateResource(resource); checkInOn()}}>Check In</Button>
                                    <Button disabled color="danger">Checked Out</Button>
                                </td>
                                : 
                                <td>
                                    <Button disabled color="success">Checked In</Button>
                                    <Button outline color="danger" onClick={() => {editUpdateResource(resource); checkOutOn()}}>Check Out</Button>
                                </td>
                                }
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