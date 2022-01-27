import { useState, useEffect } from 'react'
import { getPost } from '../config/Myservice'
import Navbaar from './Navbaar'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

// export const usercontext = createContext();
export default function Menu() {
    const [info, setinfo] = useState(0)
    const [state, setstate] = useState([])

    const refresh = () => {
        if (localStorage.getItem('_token') != undefined) {
            getPost().then(res => {
                setstate(res.data)
                console.log(res.data, "dfhj")
            })
            let items = JSON.parse(localStorage.getItem('cart'))
            let sum = 0
            if (items.length != 0) {
                items.forEach(ele => {
                    sum += ele.quantity
                })
            }
            setinfo(sum)
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    const add = (ele) => {
        let data = JSON.parse(localStorage.getItem('cart'))

        let flag = data.filter(item =>
            item.name === ele.name
        )
        if (flag.length === 0) {
            let details = { name: ele.name, price: ele.price, quantity: 1 }
            data.push(details)
            localStorage.setItem('cart', JSON.stringify(data));
           
        }
        else {
            data.map((e, index) => {
                if (e.name === ele.name) {
                    data[index].quantity += 1
                    data[index].price *= data[index].quantity

                    localStorage.setItem('cart', JSON.stringify(data));
                    
                }
            })
        }
        refresh()



    }
    return (
        <>
            {localStorage.getItem('_token') != undefined ?
                <div>
                    <Navbaar user={info} />
                    <Container>
                        <Row>
                            {state.map(ele =>
                                <Col>
                                    <Card style={{ width: '320px' }} className="mt-5">
                                        <Card.Img variant="top" src={ele.path} style={{ width: "300px", height: "300px" }} />
                                        <Card.Body>
                                            <Card.Title>{ele.name}</Card.Title>
                                            <Card.Text>
                                                <Button variant="primary" onClick={() => add(ele)}>Add to Cart</Button>
                                                <p>  Price: $ {ele.price} </p>


                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Container>

                </div>
                : <Navigate to="/login"></Navigate>}
        </>
    )
}