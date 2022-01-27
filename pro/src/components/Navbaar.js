import React, { useEffect ,useState} from 'react'
import { Navbar,Container,Nav, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Navbaar({user}) {
    const [badge, setbadge] = useState(0)

    useEffect(()=>{
        let items =JSON.parse(localStorage.getItem('cart'))
        let sum =0
        if(items.length !=0){
            items.forEach(ele=>{
                sum+=ele.quantity
            })
        }
       
    })

    const logout=()=>{
        localStorage.removeItem('_token');
        localStorage.removeItem('cart');
    }

    return (
        
            <div className="container-fluid my-1">
            <Navbar style={{backgroundColor:'skyblue',color:'black'}} variant="dark">
                <Container>
                    <Navbar.Brand><img src="./Myimages/aa.png" height="50px" width="30px"/></Navbar.Brand>
                    <Nav className="container-fluid mx-5 justify-content-end">

                        <Link className="text-white text-decoration-none m-2" to="/Menu" >Home</Link>
                        <Link className="text-white text-decoration-none m-2" to="/Cart" >Cart<Badge>{user===undefined?badge:user}</Badge></Link>
                        <Link className="text-white text-decoration-none m-2" to="/Profile">Profile</Link>


                    </Nav>
                    <Link to="/" style={{ textDecoration: "none", textAlign: "right" }} className="btn btn-secondary" onClick={()=>logout()}>Logout</Link>
                </Container>
            </Navbar>
        </div>
        
    )
}
