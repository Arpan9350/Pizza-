import React, { useEffect, useState } from 'react'
import { fetchdata } from '../config/Myservice';
import { Table, Button } from 'react-bootstrap';
import Navbaar from './Navbaar'
import jwt_decode from 'jwt-decode';
import { useNavigate,Navigate } from 'react-router'
export default function Cart() {
    const navigate = useNavigate()
    const [state, setstate] = useState([])
    const [total, setTotal] = useState(0)
    const [info, setinfo] = useState(0)

    const refresh = () => {
        if (localStorage.getItem('cart') != undefined) {

            setstate(JSON.parse(localStorage.getItem('cart')));
            let cartDetails = JSON.parse(localStorage.getItem('cart'));
            let sum = 0;
            cartDetails.forEach(ele => {
                sum += ele.price
            })

            setTotal(sum)
            sum=0
            if(cartDetails.length !=0){
                cartDetails.forEach(ele=>{
                    sum+=ele.quantity
                })
            }
            setinfo(sum)
            console.log(cartDetails)
        }
    }
    useEffect(() => {
        refresh()
    }, [])

    const order = () => {
        console.log("ar")
        let user = localStorage.getItem('_token')
        let decode = jwt_decode(user);
        console.log(typeof decode.uid)
        localStorage.setItem('order', JSON.stringify({
            details:decode.uid,
            price: total,
            status: "delivered"
        }))
        navigate('/Checkout')
        // placeOrder({
        //     details:user.email,
        //     price:total,
        //     status:"delivered"
        // })
    }
    const deleteData = (index) => {
        state.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state))
        refresh()

    }
    return (
        <>
        {localStorage.getItem('_token') != undefined ?
        <div>

            <Navbaar user={info}/>


            <h2>Cart</h2>
            <table stripped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S no</th>
                        <th> Pizza Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map((ele, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.price}</td>
                            <td>{ele.quantity}</td>
                            <td><button onClick={() => deleteData(index)}>Delete</button></td>
                        </tr>

                    )}


                    <tr>
                        <td colspan='2'>Your Sum is </td>
                        <td colspan='2'>{total}</td>
                        <td><button onClick={() => order()}>Order</button></td>
                    </tr>

                </tbody>
            </table>

        </div>
          : <Navigate to="/login"></Navigate>}
          </>
    )
}
