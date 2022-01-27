import React, { useRef, useEffect } from 'react'
import { Form, Col, Button } from "react-bootstrap";
import { useState } from 'react';
import { fetchdata,validation } from '../config/Myservice';
import { useNavigate } from "react-router"



export default function Login() {
    const [state, setstate] = useState([]);
    const navigate = useNavigate();
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    // useEffect(() => {
    //     fetchdata().then(res => {
    //         setstate(res.data)
    //         console.log(res.data)
    //     })
    // }, [])
    const checkdata = (event) => {
        // event.preventDefault()
        // let flag = true
        // let email = emailInput.current.value;
        // let password = passwordInput.current.value;
        // state.forEach(ele => {
        //     if (email === ele.email && password === ele.password) {
        //         localStorage.setItem('user', JSON.stringify(ele));
        //         localStorage.setItem('cart',JSON.stringify([]))
        //         flag = false
        //         navigate("/menu")
        //     }
        // })
        // if (flag) {
        //     alert("Email or Password does not match")
        // }
        event.preventDefault()
        validation({email:emailInput.current.value,password :passwordInput.current.value})
        .then(res=>{
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
              
                localStorage.setItem('cart',JSON.stringify([]));
               navigate("/menu")
            }
            if(res.data.err==1){
                alert("Email or Password does not match")
            }
        })
    }



    return (
        <div style={{ backgroundImage: "Myimages/background.jpg" }}>
            <h1 style={{ color: "darkblue", marginTop: "200px", marginLeft: "50px" }}>
                Welcome Back
            </h1>

            <Form
                className="border border-info rounded m-5 p-3"
                style={{ width: "350px", backgroundColor: "whitesmoke" }}
            >
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="text-dark float-start" id="email">
                        Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        ref={emailInput}
                        name="email"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="text-dark float-start" id="email">
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        ref={passwordInput}
                        name="password"
                    />
                </Form.Group>
                <br />


                <Button onClick={checkdata} >Login</Button>
                <Button
                    style={{ marginLeft: "20px" }}
                    variant="primary"
                    type="submit"
                    className="m-1"
                    href="/Register"
                >
                    Register
                </Button>
            </Form>
        </div>
    )
}
