import React from 'react';
import '../../font/css/fontawesome.min.css';
import '../../font/css/brands.min.css';
import '../../font/css/regular.min.css';
import '../../font/css/solid.min.css';
import './Products.css';

const Products = (props) => {
 const  {img,name,seller,price,stock,features} = props.allProducts;
    return (
        <div className="main">
            <div className="img">
                <img src={img} alt="" srcset=""/>
            </div>
            <div className="productBody">
                <h3 className="productName">{name}</h3>
                <p>by:{seller}</p>
                <div className="product-des">
                    <div className="left">
                        <p>${price}</p>
                        <p>only {stock} left in stock - order soon</p>
                        <button onClick={() => props.addCart(props.allProducts)}><i class="fas fa-shopping-cart"></i>add to cart</button>
                    </div>
                    <div className="right">
                        <span>
                            <span className="far fa-star"></span>
                            <span className="far fa-star"></span>
                            <span className="far fa-star"></span>
                            <span className="far fa-star"></span>
                            <span className="far fa-star"></span>
                        </span>
                        <h3>Features</h3>
                        <ul>
                            {features.map(features => <li>{features.description}:<b>{features.value}</b></li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;