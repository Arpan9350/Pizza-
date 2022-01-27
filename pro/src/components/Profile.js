import React, { useState, useEffect } from 'react'
import Navbaar from './Navbaar'
import { Card, Container } from 'react-bootstrap'
import { allorders } from '../config/Myservice'
import jwt_decode from 'jwt-decode';
export default function Profile() {
    // const [postdata, setPostdata] = useState([]);
    const [uid, setUid] = useState('')
    const [data, setdata] = useState([])
    // useEffect(() => {
    //     // allorders().then(res => {
    //     //     console.log(res.data)
    //     //     setdata(res.data)
    //     // })
    // }, [])
    useEffect(() => {

        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setUid(decode.uid)
            allorders().then(res => {
                console.log(res.data)
                setdata(res.data)
            })
        }
     }, [])
    return (
        <div>
            <Navbaar />
            <Container>
                <Card className="text-center">
                    {/* <Card.Header>Welcome {JSON.parse(localStorage.getItem('user')).name}</Card.Header> */}
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                            Email :      {uid}<br />
                            {/* Contact No :      {JSON.parse(localStorage.getItem('user')).contact}<br />
                            Address  :      {JSON.parse(localStorage.getItem('user')).address}<br /> */}

                        </Card.Text>

                    </Card.Body>

                </Card>
                <h2>Your Previous Idea </h2>
                <table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>S no</th>
                            <th> user </th>
                            <th>Price</th>
                            <th>status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((ele, index) =>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{ele.details}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.status}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </Container>
        </div>
    )
}
