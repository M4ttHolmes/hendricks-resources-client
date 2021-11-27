import React, {useState} from 'react';
import { Form, FormGroup, ModalHeader, Button, Label, Input, Modal, ModalBody } from 'reactstrap';
// import APIURL from '../helpers/environment';

const CreateResource = (props) => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("")

    const createResource = (e) => {
        e.preventDefault();
        // fetch(`${APIURL}/character/create`, {
        fetch(`http://localhost:5000/resource/create`, {
            method: "POST",
            body: JSON.stringify({
                resource: {
                    name: name,
                    owner: "",
                    checkedOut: false,
                    location: location,
               
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(json => {
            setName("");
            setLocation("");    
            props.getAllResources();
            props.createOff();       
        })
        .catch(err => console.log(err))
        
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Create New Resource</ModalHeader>
            <ModalBody>
                <Form onSubmit={createResource}>
                    <FormGroup>
                        <Label htmlFor="name">Resource Name</Label>
                        <Input name="name" value={name} onChange={(e) => setName(e.target.value)}/>

                        <Label htmlFor="charClass">Location</Label>
                        <Input type="select" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option hidden>--Choose a Location--</option>
                            <option value="Avon">Avon</option>
                            <option value="Danville">Danville</option>
                            <option value="Plainfield">Plainfield</option>
                        </Input>
                    </FormGroup>
                    <Button className="editBtn" type="submit">Create</Button>
                    <Button className="editBtn" outline onClick={props.createOff}>Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
        
        
    )
}

export default CreateResource;