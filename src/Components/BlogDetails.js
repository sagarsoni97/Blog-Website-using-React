import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage, serverTimestamp } from '../firebaseConfig';
import { Button, Navbar, Nav, Card } from 'react-bootstrap';
import Moment from 'react-moment';
import Header from './Header';

const BlogDetails = (props) => {
console.log(props);
    const [user,setUser] = useState(null)
    useEffect(()=>{
         auth.onAuthStateChanged(user=>{
           if(user) setUser(user)
           else setUser(null)
         })
    },[])

    const id = (props.match.params.BlogDetails)

    const [item, setItem] = useState([])
    const [date, setDate] = useState('')

    console.log(item)

    const getData = async () => {
        const result = await db.collection('blog').doc(id).get()
        setItem(result.data())
        const dateToFormat = (item.createdAt)
        setDate(dateToFormat)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container">
            <Header />
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
                    <Card.Text>
                        <p> Posted on : 
                        <Moment interval={30000}>
                            <p>{date}</p>
                        </Moment>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

    )
}

export default BlogDetails
