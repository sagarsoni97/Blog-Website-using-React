import React from 'react'
import { Button, Navbar, Nav, Card } from 'react-bootstrap';

export const CustomCard = ({title, body, image, variant}) => {
    return (
        <div>
             <Card style={{ width: '18rem' }}>
               <img className="img-thumbnail" variant="top" style={{height:300, width:"100%"}} src={image} />
                   <Card.Body>
                     <Card.Title className="title">{title}</Card.Title>
                       <Card.Text className="body">
                           {body}
                       </Card.Text>
                       <Button variant="warning"><Nav.Link href={`/${id}`}>Read Full Blog</Nav.Link></Button>
                    </Card.Body>
             </Card>
        </div>
    )
}


