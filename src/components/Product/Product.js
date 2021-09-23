import React, {useContext, useState} from "react";
import './Product.css';
import {AllProducts} from "../../store/AllProducts";
import {useSelector} from 'react-redux';

const Product = (props) => {
    const role = props.role;
    const {allProducts, setAllProducts} = useContext(AllProducts);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    function removeProductHandler() {
        const index = allProducts.indexOf(props.id)
        setAllProducts(allProducts.filter((item, idx) => idx !== index));
    }

    function addToCart(){

    }

    function removeFromCart(){

    }

    return (
            <section className="Product">
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="name">{props.name}</div>
                <div className="Price">{props.price}</div>
                <div className="description">{props.description}</div>

            {isAuthenticated ? null : props.history.push("/login")}
            {
            role == "BUYER" ?
            <section>
                        {
                        allProducts.includes(props.id)
                        ?
                        <button onClick={() => {addToCart()}}>
                            add to cart </button>
                        :
                        <button onClick={() => {
                            console.log(allProducts);
                            removeFromCart([...allProducts, props.id])
                        }}>
                            remove from cart </button>}
            </section>
            :
            <section>
                <button onClick={() => {removeProductHandler()}}>Remove Product </button>       
            </section>
}

                

            </div>
        </section>
                    
    );
}

export default Product;