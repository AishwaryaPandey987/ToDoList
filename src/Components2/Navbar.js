import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import LoginModal from './LoginModal'; // Adjust the path as necessary
import './Navbar.css';

const MyNavbar = ({ isLoggedIn, handleLogout, username, setErrorMessage }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Navbar className="bg-body-tertiary" bg="light" expand="lg" fixed="top">
                <Navbar.Brand href="#home">To-Do List</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="ml-auto">
                        {isLoggedIn ? (
                            <>
                                <Nav.Item className="me-4" style={{ whiteSpace: 'nowrap', textAlign: 'center', color: 'black' }}>
                                    {/* Display the username */}
                                    Logged in as: <strong>{username}</strong>
                                </Nav.Item>
                                <Button variant="danger" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={() => setShowLogin(true)}>
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <LoginModal
                show={showLogin}
                handleClose={() => setShowLogin(false)}
                setUsername={(username)=>{}}
                setShowLoginModal={setShowLogin} // Pass setShowLogin to close the modal
                setErrorMessage={setErrorMessage} // Pass setErrorMessage to handle errors
            />
        </>
    );
};

export default MyNavbar;