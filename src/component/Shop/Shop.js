import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css';

const Shop = () => {
    //set data in database
    const products = fakeData.slice(0,10);
    const [cart,setIt] = useState([]);
    const addCart = (getProducts) => {
        const count = cart.filter(count => count.key == getProducts.key);
        getProducts.quantity = count.length+1;
        const newCart= [...cart,getProducts];
        setIt(newCart);
        addToDatabaseCart(getProducts.key,count.length+1);
    }

    //get data form database 
    const getCart = getDatabaseCart();
    const cartKeys = Object.keys(getCart);
    const getKeys = cartKeys.map(keys => {
        const getCartValues = fakeData.filter( values => values.key === keys);
        getCartValues.map(product => product.quantity = getCart[keys]);
        return getCartValues;
    }
    );

    let object = [];
    getKeys.map(getCarts => object.push(getCarts[0]));


    return (
        <div className="all">
            <div className="products">
                {
                    products.map(product => <Products productStatus={false} allProducts={product} addCart={addCart} ></Products>)
                }
            </div>
            <div className="card">
                <Cart cart={object} review={false} ></Cart>
            </div>
        </div>
    );
};

export default Shop;