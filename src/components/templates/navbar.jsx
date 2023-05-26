import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../statics/img/slogan1.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faCircleUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

function NavScrollExample() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const token = localStorage.getItem("token")

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    const list =()=>{
        navigate("/list")
    }
    const perfil = () => {
        navigate("/perfil")
    }
    const option = () => {
        return (
            <NavDropdown
                title=""
                id="navbarScrollingDropdown"
                show={showDropdown}
                onClick={handleDropdownToggle}
            >
                <NavDropdown.Item id="dropdown-option" onClick={perfil}><FontAwesomeIcon icon={faCircleUser}/> Profile</NavDropdown.Item>
                <NavDropdown.Item id="dropdown-option" href="#action4"><FontAwesomeIcon icon={faGear}/> Settings</NavDropdown.Item>
                <NavDropdown.Item id="dropdown-option" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/> Logout</NavDropdown.Item>
            </NavDropdown>
        );
    };

    return token ?
        <Navbar bg="lith" expand="lg" id="navbar">
            <Container fluid>
                <Navbar.Brand href="#"><img src={logo} alt="logo" className='logo-system'></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" id="nav-options" style={{ maxHeight: '100px' }} navbarScroll>
                    <Form className="d-flex" id="form-navbar">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button id="button-navbar" variant="outline-dark">Search</Button>
                            </Form>
                        <Nav.Link onClick={list}>Home</Nav.Link>
                        <div className='logo-mayor'>
                            <div className="logo-header" onClick={handleDropdownToggle}>
                                <img
                                    src="https://www.shutterstock.com/image-photo/3d-image-man-sitting-behind-600w-2258641283.jpg"
                                    alt="img"
                                ></img>
                                {option()}
                            </div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> :
        <Outlet />
}

export default NavScrollExample;
