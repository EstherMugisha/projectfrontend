import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";

import toast, {Toaster} from 'react-hot-toast';
import {useHistory} from "react-router";
import ShoppingCart from "../ShoppingCart";
import StripeCheckoutButton from '../Stripe/StripeCheckout';


const Checkout = (props) => {
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartId, setCartId] = useState();
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
            setCartId(response.data.id);
            console.log(response.data);
        }).catch(function (error) {
            setLoading(false);
            setError(error.message);
            toast.error(error.message);
        });
    }

    useEffect(fetchCart, []);

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <main className="Checkout col-md-12">
                <ShoppingCart isOnCheckout={true}/>
                <section>
                    <h5>Proceed to pay: </h5>
                    <StripeCheckoutButton cartId={cartId} price={total} />
                </section>
            </main>
            <Toaster position="top-right"/>
        </React.Fragment>
    );
}
export default Checkout;
