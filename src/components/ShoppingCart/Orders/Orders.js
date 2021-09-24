import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './Orders.css';
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import { useHistory } from "react-router";
import toast, {Toaster} from "react-hot-toast";
import Order from "../Order/Order";


const Orders = (props) => {
    const history= useHistory();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [role,setRole] = useState("BUYER");

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function fetchOrdersHandler() {
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        axios.get('/orders/history', {headers})
            .then(response => {
                setOrders(response.data);
                if(isAuthenticated){
                    setRole(Cookies.get('user_role'));
                }
            })
            .catch(error => {
                setError(error.message);
                toast.error(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchOrdersHandler, []); // This will be fetched when mounted


    const fetchedOrders = orders.map(order => {
        return (
            <Order
                key={order.id}
                id={order.id}
                amount={order.amount}
                status={order.orderStatus}
                buyer={order.user}
                orderLine={order.orderLine}
                totalPrice={order.totalPrice}
                createdAt={order.created_at}
                // addProductToCart={addProductToCart}
            />)
    });

    let content = <p>No orders available</p>;
    if (fetchedOrders.length > 0) {
        content = fetchedOrders;
    } else if (error) {
        content = <p>{error}</p>;
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <section className="Orders">
                {content}
            </section>
            <Toaster position="top-right"/>
        </React.Fragment>
    );
}


export default Orders;
