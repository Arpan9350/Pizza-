import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (

        <div className="container-fluid my-1">
            <Navbar  variant="dark">

                <Navbar.Brand><img src="./Myimages/aa.png" height="50px" width="30px" /></Navbar.Brand>
                <Nav className="container-fluid mx-5 justify-content-end">

                    <Link className="text-white text-decoration-none m-2 btn btn-secondary "  variant="outline-secondary" to="/Login" >Login</Link>
                    <Link className="text-white text-decoration-none m-2 btn btn-secondary"  variant="outline-secondary"to="/Register">Sign up</Link>
                    


                </Nav>


            </Navbar>


            <div style={{ backgroundColor: 'whitesmoke', width: '89ch' }} className="container mt-5 p-5">
                <h1>Pizza Delivery</h1>
                <p style={{ fontSize: '20px' }}>Welcome to pizza delivery service. This is the place when you may chose the most delicious pizza you like from wide variety of options!</p>
                <br />
                <hr />
                <p style={{ fontSize: '20px' }}>We're performing delivery free of charge in case if your order is higher than 20$</p>
                <Link className="btn btn-secondary" style={{width:"100%"}} variant="outline-secondary" to="/Register" >Sign Up and Order</Link>
            </div>
        </div>

    )
}
