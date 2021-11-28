import React, {useState} from 'react';
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment';


const CheckOutResource = (props) => {
    const [editName, setEditName] = useState(props.updatedResource.name);
    const [editOwner, setEditOwner] = useState(props.updatedResource.owner);
    const [editLocation, setEditLocation] = useState(props.updatedResource.location);

    const resourceUpdate = (e, resource) => {
        e.preventDefault();
        console.log(props);
        fetch(`${APIURL}/resource/update/${props.updatedResource.id}`, {

            method: "PUT",
            body: JSON.stringify({resource: {
                name: editName,
                owner: editOwner,
                checkedOut: true,
                location: editLocation,
           
            }}),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
            .then(res => res.json())
            .then(json => {
            props.getAllResources();
            props.checkOutOff();
            

        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Check Out Resource</ModalHeader>
            <ModalBody>
                <Form onSubmit={resourceUpdate}>
                    <FormGroup>
                        <p>You are checking out the following resource:</p>
                        <Label htmlFor="name">Resource Name</Label>
                        <Input name="name" disabled value={editName} onChange={(e) => setEditName(e.target.value)}/>

                        <Label htmlFor="owner">Who is checking out this resource?</Label>
                        <Input type="select" value={editOwner} onChange={(e) => setEditOwner(e.target.value)}>
                            <option hidden>--Choose a Person--</option>
                            <option value="Amy Brandenstein">Amy Brandenstein</option>
                            <option value="Christen Gaunt">Christen Gaunt</option>
                            <option value="Jennifer Hall">Jennifer Hall</option>
                            <option value="Emily Holmes">Emily Holmes</option>
                            <option value="Hannah Lukemeyer">Hannah Lukemeyer</option>
                            <option value="Hannah Magie">Hannah Magie</option>
                            <option value="Kayla Weaver">Kayla Weaver</option>
                        </Input>

                        <Label htmlFor="charClass">Check-Out Location</Label>
                        <Input type="select" value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
                            <option hidden>--Choose a Location--</option>
                            <option value="Avon">Avon</option>
                            <option value="Danville">Danville</option>
                            <option value="Plainfield">Plainfield</option>
                        </Input>
                    </FormGroup>
                    <Button className="editBtn" type="submit">Check Out</Button>
                    <Button className="editBtn" type="submit" outline onClick={props.checkOutOff}>Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
        
        
    )
}

export default CheckOutResource;