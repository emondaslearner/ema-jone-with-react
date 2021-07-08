import React from 'react';
import emaLogo from '../../images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='logo'>
                <img src={emaLogo} alt="" srcset=""/>
                
            </div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory here</a>
            </nav>
        </div>
    );
};

export default Header;