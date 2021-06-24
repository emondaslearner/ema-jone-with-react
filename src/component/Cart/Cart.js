import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const price=props.cart.map(alls => alls.price);
    let sum= 0;
    for(let i = 0;i<price.length;i++){
        sum = sum + price[i];
    }
    let fix = Math.round(sum)
    let shipping= 0;
    

    if(sum > 0){
        shipping = 15.99;
    }
    if(sum > 15){
        shipping=7.99;
    }
    if(sum > 40){
        shipping = 0;
    }
    let tex = Math.round((sum / 10));

    const subTotal = tex + shipping+ fix;
    return (
        <div class="cart">
            <h2>Order Summary</h2>
            <p className="itemsCount">Items Ordered:{props.cart.length}</p>
            <div className="totalCount">
                <p>Items: <span>${fix}</span></p>
                <p>Shipping & Handing: <span>${shipping}</span></p>
                <p>Estimated Tax: <span>${tex}</span></p>
                <h4>Order Total: <span>${subTotal}</span></h4>
            </div>
        </div>
    );
};

export default Cart;