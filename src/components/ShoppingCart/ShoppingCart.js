import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './ShoppingCart.css';
import Product from "../Product/Product";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {ShowProducts} from "../../store/ShowProducts";

const ShoppingCart = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const {showProducts, setShowProducts, allProducts, setAllProducts} = useContext(ShowProducts);

    const [cartItems, setCartItems] = useState([]);
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

    const rproducts = cartItems.cartLine.map(product => {
        return (
            <Product
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                id={product.id}
            />)
    });

    let content = <p>No posts available</p>;
    if (rproducts.length > 0) {
        content = rproducts;
    } else if (error) {
        content = <p>{error}</p>;
    } else if (isLoading) {
        content = <p> Loading ... </p>;
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <section className="Products">
                {content}
            </section>
        </React.Fragment>
    );
}

export default ShoppingCart;
