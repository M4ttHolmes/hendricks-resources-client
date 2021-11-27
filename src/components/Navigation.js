import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import Logo from "../assets/hrh-logo.png"

const styles = {
    logo: {
        height: "60px",
        marginRight: "15px"
    }
}

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
        <div>
            <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/"><img style={styles.logo} src={Logo} alt="HRH Logo"/>Pediatric Resource Repository</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ms-auto" navbar>
                {/* //! Conditional Statement for Session State Token - Hide */}
                <NavItem>
                    <NavLink><Button>Create</Button></NavLink>
                </NavItem>
                {/* //! Conditional Statement for Session State Token - Toggle Login/Logout */}
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap"><Button>Login</Button></NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}