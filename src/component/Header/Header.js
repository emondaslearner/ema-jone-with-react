import React from 'react';
import emaLogo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='logo'>
                <img src={emaLogo} alt="" srcset=""/>
                
            </div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order Review">Order Review</a>
                <a href="/manage inventory here">Manage Inventory here</a>
            </nav>
        </div>
    );
};

export default Header;