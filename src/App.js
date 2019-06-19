import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Shop from './Shop/Shop';
import Cart from './Cart/Cart';
import Navbar from './Navbar/Navbar';
import Details from "./Details/Details";

function App() {
  return (
    <div>
      <Navbar/>
      <Route path="/" exact component={Shop}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/details/:id" component={Details}/>
    </div>
  );
}

export default App;
