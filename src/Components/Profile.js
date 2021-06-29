import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage, serverTimestamp } from '../firebaseConfig';
import { Button, Navbar, Nav, Card, Modal, Form } from 'react-bootstrap';
import Moment from 'react-moment';
import firebase from 'firebase'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from './Header';

const Profile = () => {

    const [item, setItem] = useState([])
    const [myAds, setMyAds] = useState(false)
    const [date, setDate] = useState('')
    const [updateItem, setUpdateItem] = useState('')
   
    console.log(updateItem)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory()

    useEffect(() => {
        setTimeout(
  () => getDetails(), 
  3000
  )
    }, [])

    const getDetails = async () => {
        setMyAds(true)
        const querySnap = await db.collection('blog')
            .where('uid', '==', auth.currentUser.uid)
            .get()
        const result = await querySnap.docs.map((docSnap) => {
            return {
                ...docSnap.data(),
                id: docSnap.id
            }
        })
        const dateToFormat = (item.createdAt)
        setDate(dateToFormat)
        setItem(result)
    }

    const handleDelete = async (id) => {
        db.collection("blog").doc(id).delete().then(() => {
            getDetails()
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const handleUpdate = async(id) => {
        handleShow()
      try {
          const docRef = db.collection('blog').doc(id)
          const result = await docRef.get()
          setUpdateItem(result.data())
      } catch (error) {
          console.log(error);
      }
    }


    return (
        <div className="container">
           <Header />
           
            {
                myAds === true ?
                    <>
                        <h3>Email: {auth.currentUser.email}</h3>
                        <h4>Your Posted Blog :- </h4>
                        <div className=" row row-cols-3 d-flex justify-content-center">
                        {
                            item.map((item, key) => {
                                return (
                                    <div key={key} className="container">
                                        <Card >
                                            <Card.Img style={{ height: 500, widht: 800 }} className="img-thumbnail" variant="top" src={item.imageUrl} />
                                            <Card.Body>
                                                <Card.Title >{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.body}
                                                </Card.Text>
                                                <Card.Text>
                                                    Posted By :  {item.postedBy}
                                                </Card.Text>
                                            </Card.Body>
                                            <Button onClick={() => handleUpdate(item.id)} variant="success">Update</Button>
                                            <Button onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>
                                        </Card>

                                        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={updateItem}
                        placeholder="describe post"
                        onChange={({ target }) => setUpdateItem(target.value)}
                    />
                </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
                           
                                    </div>
                                )
                            })


                        }
                        </div>
                    </> :
                    <>
                        <Loader
                            type="ThreeDots"
                            color="red"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                    </>
            }
            
        </div>
    )
}

export default Profile
