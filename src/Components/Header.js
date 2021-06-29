import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage, serverTimestamp } from '../firebaseConfig';
import { Button, Navbar, Nav, Card, Modal, Form } from 'react-bootstrap';

const Header = () => {

    const history = useHistory()

    const logOut = () => {
        try {
            auth.signOut()
                .then(() => {
                    history.push('/Signin')
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

            <Navbar color="yellow" bg="light" expand="lg">
                <Navbar.Brand href="/Home">Blogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-lg-end">
                        <Button onClick={() => logOut()} variant="danger">Logout</Button>
                        <Nav.Link style={{ backgroundColor: 'white' }} href="/CreateBlog">Create Blog Post</Nav.Link>
                        <Nav.Link href="/Profile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;


