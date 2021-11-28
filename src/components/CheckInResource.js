import React, {useState} from 'react';
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';
// import APIURL from '../helpers/environment';


const CheckInResource = (props) => {
    const [editName, setEditName] = useState(props.updatedResource.name);
    const [editOwner, setEditOwner] = useState(props.updatedResource.owner);
    const [editLocation, setEditLocation] = useState(props.updatedResource.location);

    const resourceUpdate = (e, resource) => {
        e.preventDefault();
        console.log(props);
        // fetch(`${APIURL}/resource/update/${props.updatedResource.id}`, {
        fetch(`http://localhost:5000/resource/update/${props.updatedResource.id}`, {

            method: "PUT",
            body: JSON.stringify({resource: {
                name: editName,
                owner: "",
                checkedOut: false,
                location: editLocation,
           
            }}),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
            .then(res => res.json())
            .then(json => {
            props.getAllResources();
            props.checkInOff();
            

        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Check In Resource</ModalHeader>
            <ModalBody>
                <Form onSubmit={resourceUpdate}>
                    <FormGroup>
                        <p>You are checking in the following resource:</p>
                        <Label htmlFor="name">Resource Name</Label>
                        <Input name="name" disabled value={editName} onChange={(e) => setEditName(e.target.value)}/>

                        <Label htmlFor="owner">Current Owner</Label>
                        <Input type="text" disabled value={editOwner} onChange={(e) => setEditOwner(e.target.value)} />

                        <Label htmlFor="charClass">Check-In Location</Label>
                        <Input type="select" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
                            <option hidden>--Choose a Location--</option>
                            <option value="Avon">Avon</option>
                            <option value="Danville">Danville</option>
                            <option value="Plainfield">Plainfield</option>
                        </Input>
                    </FormGroup>
                    <Button className="editBtn" type="submit">Check In</Button>
                    <Button className="editBtn" type="submit" outline onClick={props.checkInOff}>Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
        
        
    )
}

export default CheckInResource;