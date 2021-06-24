import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css';

const Shop = () => {
    const product = fakeData.slice(0,10);
    const [cart,setIt] = useState([]);
    const addCart = lets => {
        const newCart = [...cart,lets];
        setIt(newCart);
    };
    return (
        <div className="all">
            <div className="products">
                {product.map(product => <Products addCart={addCart} key={product.key} allProducts={product}></Products>)}
            </div>
            <div className="card">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;