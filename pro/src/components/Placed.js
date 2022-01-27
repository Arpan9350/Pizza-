import React from 'react'
import Navbaar from './Navbaar'
import { Container, Button } from 'react-bootstrap'
import { Link,Navigate } from 'react-router-dom';

export default function Placed() {
    return (
        <>
        {localStorage.getItem('_token') != undefined ?
        <div>
            <Navbaar />
            <Container>
                <h1>Order Has Been Placed Successfully!</h1>
                <h4 className="bg-success">You will Recive the Notification On email with Order Details</h4>
                <Link to="/Menu" style={{ textDecoration: "none", textAlign: "right" }} className="btn btn-dark" >Go and Order Somemore</Link>
            </Container>
        </div>
         : <Navigate to="/login"></Navigate>}
        </>
    )
}
