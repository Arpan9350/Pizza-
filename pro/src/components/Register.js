import React, { useRef, useState } from 'react'
import { Form, Col, Button, Row } from "react-bootstrap";
import { addPost } from '../config/Myservice';
import {useNavigate} from "react-router"

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForPass = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
const regForContact = RegExp(/^[6-9][0-9]{9}/);
const regForAddress = RegExp(/^[a-zA-Z0-9]{5}/);
export default function Register() {
    const navigate=useNavigate();
    const [errors, seterror] = useState({ errname: '', erremail: '', errcontact: '', erraddress: '', errpassword: '', errcpassword: '', password: null });
    const nameInput = useRef(null);
    const addressInput = useRef(null);
    const contactInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const cpasswordInput = useRef(null);

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {

            case "name":
                let error1 = regForName.test(value) ? " " : "Invalid Name";
                seterror({ ...errors, errname: error1 });
                break;

            case "email":
                let error2 = regForEmail.test(value) ? " " : "Enter Correct Email-Id";
                seterror({ ...errors, erremail: error2 });
                break;

            case "contact":
                let error3 = regForContact.test(value) ? " " : "Enter Correct Mobile Number";
                seterror({ ...errors, errcontact: error3 });
                break;

            case "address":
                let error4 = regForAddress.test(value) ? " " : "Enter Correct address";
                seterror({ ...errors, erraddress: error4 });
                break;

            case "password":
                let error5 = regForName.test(value)
                    ? " "
                    : "Password Should Contain atleast 8 character with Upper, lower and special character";
                seterror({ ...errors, errpassword: error5, password: value });
                break;

            case "cpassword":
                let error6 = value === errors.password ? "" : "Password does not match";
                seterror({ ...errors, errcpassword: error6 });
                break;
        }
    };
    const validate=async()=>{
        if(nameInput.current.value!='' && emailInput.current.value!='' && contactInput.current.value!='' && addressInput.current.value!='' && passwordInput.current.value!='' && cpasswordInput.current.value!='' ){
            let formData = {
              name:nameInput.current.value,
              email:emailInput.current.value,
              contact:contactInput.current.value,
              address:addressInput.current.value,
              password: passwordInput.current.value,
              cpassword: cpasswordInput.current.value
            }
           await addPost(formData)
            navigate("/Login")
        }
    }
    return (

        <div style={{ marginTop: "100px", width: "600px" }}>
            <h2 style={{ "color": 'darkblue', marginTop: "75px", marginLeft: "50px" }} >Registration Form</h2>
            <Form className="border border-info rounded m-5 p-3" style={{ backgroundColor: "whitesmoke" }}>


                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="text-dark float-start" id="Name">
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            id="Name"
                            ref={nameInput}
                            name="name"
                            onBlur={handler}

                        />
                        <span className="text-danger">{errors.errname}</span>
                    </Form.Group>


                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="text-dark float-start" id="email">
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            ref={emailInput}
                            onBlur={handler}
                            name="email"

                        />
                        <span className="text-danger">{errors.erremail}</span>
                    </Form.Group>
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label className="text-dark" id="contact">
                            Contact No
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Contact no"
                            id="contact"
                            ref={contactInput}
                            name="contact"
                            onBlur={handler}
                        />
                        <span className="text-danger">{errors.errcontact}</span>
                    </Form.Group>
                </Row>
                <Row className="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label className="text-dark" id="contact">
                            Addres
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Your address"
                            
                            ref={addressInput}
                            name="address"
                            onBlur={handler}
                        />
                        <span className="text-danger">{errors.erraddress}</span>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label className="text-dark float-start" id="password">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            id="password"
                            ref={passwordInput}
                            name="password"
                            onBlur={handler}
                        />
                        <span className="text-danger">{errors.errpassword}</span>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label className="text-dark" id="confirmpassword">
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmpassword"
                            ref={cpasswordInput}
                            onBlur={handler}
                            name="cpassword"

                        />
                        <span className="text-danger">{errors.errcpassword}</span>
                    </Form.Group>
                </Row>
                <Button
                    variant="primary"

                    className="m-3"
                    onClick={validate}
                >
                    Register
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    className="m-1"
                    href="/"
                // onClick={login}
                >
                    Login
                </Button>
            </Form>

        </div>

    )
}
