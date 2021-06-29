import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage, serverTimestamp, id } from '../firebaseConfig';
import { Button, Navbar, Nav, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from './Header';

const Home = () => {

    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(false)

    console.log(items);

    const history = useHistory()

    const getData = async () => {
        setLoader(true)
        const querySnap = await db.collection('blog').orderBy('createdAt', 'desc')
            .get()
        const result = querySnap.docs.map((docSnap) => {
            return {
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt.toMillis(),
                id: docSnap.id
            }
        })
        setItems(result)
    }

    useEffect(() => {
        getData()
    }, [])

    const logOut = () => {
        try {
            auth.signOut()
                .then(() => {
                    toast.success("Logout Success")
                    history.push('/Signin')
                })
        } catch (error) {
            toast.error(error)
        }

    }

    return (
        <div className="container">
            <div>
               <Header />
            </div>
            {
                items.length ?
                    <>
                        <div className=" row row-cols-3 d-flex justify-content-center">

                            {
                                items.map((item, key) => {
                                    return (
                                        <div key={item.id}>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Img style={{ height: 300, widht: 300 }} className="img-thumbnail" variant="top" src={item.imageUrl} />
                                                <Card.Body>
                                                    <Card.Title className="title">{item.title}</Card.Title>
                                                    <Card.Text className="body">
                                                        {item.body}
                                                    </Card.Text>
                                                    <Button variant="warning"><Nav.Link href={`/${item.id}`}>Read Full Blog</Nav.Link></Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })
                            }


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
                    </> :

                    <>
                    <div className="row row-cols-3 d-flex justify-content-center">
                        <Loader
                            type="ThreeDots"
                            color="red"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                        </div>
                    </>
            }

        </div>
    )
}

export default Home;
