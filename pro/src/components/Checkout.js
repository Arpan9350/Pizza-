import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Navbaar from './Navbaar'
import { Link } from 'react-router-dom';
import { placeOrder } from '../config/Myservice'
import { useNavigate,Navigate} from 'react-router'
export default function Checkout() {
    const navigate = useNavigate()
    const [state, setstate] = useState({})
    useEffect(() => {
        let Order = JSON.parse(localStorage.getItem('order'));
        setstate(Order)
    }, [])
    const checkout = () => {
        placeOrder(state)
        localStorage.removeItem("order");
        navigate('/Placed')
        localStorage.setItem('cart', JSON.stringify([]))


    }
    return (
        <>
        {localStorage.getItem('_token') != undefined ?
        <>
            
            <Navbaar />
            <Container>
                <h1>Checkout</h1>
                <form>
                    <div class="form-group">
                        <label>Credit Card Number</label>
                        <input type="text" class="form-control" aria-describedby="emailHelp" maxLength="16" placeholder="Enter Card details " />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <h5>Order Total:</h5>
                    <button className="btn btn-secondary" onClick={() => checkout()}>Checkout</button>
                </form>
            </Container>
            </>
                : <Navigate to="/login"></Navigate>}
        </>
    )
}
