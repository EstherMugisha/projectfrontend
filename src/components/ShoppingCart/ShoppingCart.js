import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './ShoppingCart.css';
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {APIConfig} from "../../store/API-Config";
import CartItem from "./CartItem/CartItem";
import Total from "./Total/Total";


const ShoppingCart = (props) => {

    // const APIs = useContext(APIConfig);
    // const cartAPI = APIs.cartAPI;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [displayAllFlag, setDisplayAllFlag] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    function fetchCart() {
        setLoading(true);
        setError(null);
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }

        axios.get('/cart', {headers}).then(function (response) {
            setCartItems(response.data.cartLine);
            console.log(response.data);
        }).catch(function (error) {
            setLoading(false);
            setError(error.message);
        });
    }

    useEffect(fetchCart, []);

    function calculateTotal(price) {
        setTotal(total + price);
        console.log(total);
    }

    function showProduct(info) {
        console.log(info);
        alert(info);
    }

    const itemsOnCart = cartItems.map(function (item) {
        return (
            <CartItem
                name={item.product.name}
                price={item.product.price}
                info={item.quantity}
                handleShow={showProduct}
                handleTotal={calculateTotal}
            />
        );
    });

    let content = <p>No items in cart</p>;
    if (itemsOnCart.length > 0) {
        content = itemsOnCart;
    } else if (error) {
        content = <p>{error}</p>;
    } else if (isLoading) {
        content = <p> Loading ... </p>;
    }

    return (
        <div>
            {content}
            <Total total={total}/>
        </div>
    );

}
export default ShoppingCart;
