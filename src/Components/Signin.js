import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import {auth, db, storage, serverTimestamp} from '../firebaseConfig';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CustomButton} from './CustomComponent/CustomButton'
import {Variant} from './CustomComponent/Variant'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const register = async () => {
        try {
          await auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    history.push('/Home')
                    alert("Login Success")
                })
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div className="container">
            <div>
                <div className="d-flex justify-content-center">

                    <Form>
                        <h1>Signin Here</h1>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="enter your email"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />

                        </Form.Group>
                        <CustomButton variant={Variant.success} title={'Signin'} onClick={()=>register()} />
                        <NavLink to="/"> Already have account Login here... </NavLink>
                    </Form>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </div>
        </div>
    )
}

export default Signin;
