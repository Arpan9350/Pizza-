import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Profile from './components/Profile';
import Cart from './components/Cart'
import Checkout from './components/Checkout';
import Placed from './components/Placed';
import Home from './components/Home';




function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Menu" element={<Menu />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/Checkout" element={<Checkout />}></Route>
          <Route path="/Placed" element={<Placed />}></Route>
          <Route path="*"></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
