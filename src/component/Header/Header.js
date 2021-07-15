import React, { useContext } from 'react';
import emaLogo from '../../images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './Header.css';
import { theme } from '../../App';

const Header = () => {
    const [loginUser,setLoginUser] = useContext(theme);
    const handleSingOut = (event) => {
        event.preventDefault();
        setLoginUser('');
    }
    return (
        <div>
            <div className='logo'>
                <img src={emaLogo} alt="" srcset=""/>
                
            </div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory here</a>
                {
                    loginUser != '' && <a href="" onClick={handleSingOut} >Sign out</a>
                }
            </nav>
        </div>
    );
};

export default Header;