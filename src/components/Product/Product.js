import React, {useContext, useState} from "react";
import './Product.css';
import Cookies from 'js-cookie';
//import {AllProducts} from "../../store/FollowedSellers";
import {useSelector} from 'react-redux';
import axios from "axios";
import { useHistory } from "react-router";

const Product = (props) => {
    const role = props.role;
    const history= useHistory();
   // const {allProducts, setAllProducts} = useContext(AllProducts);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    function removeProductHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        axios.delete('/products/'+props.id, {headers})
        .then(history.push('/products'));
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
                <div className="Price">${props.price}</div>
                <div className="description">{props.description}</div>

            {isAuthenticated ? null : props.history.push("/login")}
            {
            role === "SELLER" ?
            <section>
                <button onClick={() => {removeProductHandler()}}>Remove Product </button>       
            </section>
            :
            <section>

                        {
                        true
                        ?
                        <button onClick={() => {addToCart()}}>
                            add to cart </button>
                        :
                        <button onClick={() => {
   //                         console.log(allProducts);
     //                       removeFromCart([...allProducts, props.id])
                        }}>
                            remove from cart </button>}
            </section>
            
            
}     

            </div>
        </section>
                    
    );
}

export default Product;