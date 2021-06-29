import React, {useState, useEffect} from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import {auth, db, storage, serverTimestamp} from '../firebaseConfig';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import {CustomButton} from './CustomComponent/CustomButton'

const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const register = async() =>{
        try {
           await auth.createUserWithEmailAndPassword(email, password)
            .then(()=>{ 
             history.push('/Home')
             console.log("singup success")
            })
          } catch (e) {
            alert(e)
            console.log(e);
          }
    }

    return (
        <div className="container">

            <div>
                <div className="d-flex justify-content-center">

                    <Form>
                        <h1>Signup Here</h1>

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
                    
                        <CustomButton variant={'warning'} title={'Signup'} onClick={()=>register()} />
                        <NavLink to="/Signin"> Don't have account SignUp here... </NavLink>
                    </Form>

                </div>
            </div>
        </div>
    )
}

export default Signup;
