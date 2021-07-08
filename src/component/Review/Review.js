import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';

const Review = (props) => {
    //get data form database 
    const getCart = getDatabaseCart();
    const cartKeys = Object.keys(getCart);
    const getKeys = cartKeys.map(keys => {
        const getCartValues = props.reviewData.filter( values => values.key === keys);
        getCartValues.map(product => product.quantity = getCart[keys]);
        return getCartValues;
    }
    );

    let object = [];
    getKeys.map(getCarts => object.push(getCarts[0]));

    //remove cart
    const removeCart = (productItem) => {
       removeFromDatabaseCart(productItem.key);
       window.location.reload();
    }
    return (
        <>
           <div className="all">
            <div className="products">
            {
               getKeys.map(products => <Products productStatus={true} allProducts={products[0]} key={products[0].key} removeCart={removeCart} ></Products>)
            }
            </div>
            <div className="card">
                <Cart cart={object} review={true} ></Cart>
            </div>
        </div>
        </>
    );
};

export default Review;