import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage, serverTimestamp } from '../firebaseConfig';
import { Button, Navbar, Nav, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { Editor, } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Header from './Header';


const CreateBlog = () => {

    const [user, setUser] = useState(null)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState(null)

    const history = useHistory()

    useEffect(async () => {
        if (url) {
            try {
                await db.collection('blog').add({
                    title,
                    body,
                    imageUrl: url,
                    postedBy: auth.currentUser.email,
                    createdAt: serverTimestamp(),
                    uid: auth.currentUser.uid
                })
                alert("Blog Posted Successfully !")
                history.push('/Home')
            } catch (err) {

            }
        }
    }, [url])

    const postData = () => {
        if (!title || !body) {
            toast.error("All Field Required !")
            return
        }
        var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress === 100) {
                    toast.success("Image Uploaded Successfully !")
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL)
                });
            }
        );
    }

    return (
        <div className="container">
            <div>
                <Header />
            </div>
            <Form>
                <h3>Create Blog Post</h3>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={body}
                        placeholder="describe post"
                        onChange={({ target }) => setBody(target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.File id="exampleFormControlFile1"
                        label="Upload Image"
                        onChange={({ target }) => setImage(target.files[0])}
                    />
                </Form.Group>
                <Button onClick={() => postData()} variant="warning">Post</Button>

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
    )
}

export default CreateBlog
