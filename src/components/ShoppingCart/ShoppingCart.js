import React, {useEffect, useState} from "react";
import axios from 'axios';
import './ShoppingCart.css';
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import CartItem from "./CartItem/CartItem";
import Total from "./Total/Total";

import toast, {Toaster} from 'react-hot-toast';
import {useHistory} from "react-router";

const ShoppingCart = (props) => {
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function fetchCart() {
        setLoading(true);
        setError(null);
        axios.get('/cart', {headers}).then(function (response) {
            setCartItems(response.data.cartLine);
            setTotal(response.data.totalPrice);
            console.log(response.data);
        }).catch(function (error) {
            setLoading(false);
            setError(error.message);
            toast.error(error.message);
        });
    }

    useEffect(fetchCart, []);

    function calculateTotal(price) {
        setTotal(total + price);
        console.log(total);
    }

    function addItemToCart(id) {
        if (!props.isOnCheckout) {
            const data = {
                quantity: 1,
                id: id
            }
            axios.post('/cart', data, {headers}).then(function (response) {
                //add to global cart
                toast.success('Quantity updated');
                fetchCart();
            }).catch(error => {
                toast(error.message);
            })
        } else {
            toast.error("Please go to cart to update");
        }
    }

    function removeItemFromCart(id) {
        if (!props.isOnCheckout) {
            axios.post('/cart/remove/' + id, null, {headers}).then(function (response) {
                toast.success('Quantity updated');
                fetchCart();
            }).catch(error => {
                toast(error.message);
            })
        } else {
            toast.error("Please go to cart to update");
        }
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
                quantity={item.quantity}
                id={item.product.id}
                handleShow={showProduct}
                handleTotal={calculateTotal}
                handleAddToCart={addItemToCart}
                handleRemoveFromCart={removeItemFromCart}
            />
        );
    });

    let content = <p>No items in cart</p>;
    if (itemsOnCart.length > 0) {
        content = itemsOnCart;
    } else if (error) {
        content = <p>{error}</p>;
    }

    function goToCheckout() {
        toast("checkout sasa gathee");
        history.push("/checkout");
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <main className="CartItem">
                {isAuthenticated ? null : props.history.push("/login")}
                {content}
                <Total total={total}/>
            </main>
            {itemsOnCart.length && !props.isOnCheckout ?
                <div className="row">
                    <button className="mt-1 col-md-2 btn btn-primary" onClick={goToCheckout}>Checkout</button>
                </div>
                : null}
            <Toaster position="top-right"/>
        </React.Fragment>
    );
}
export default ShoppingCart;
