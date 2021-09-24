import React from "react";
import './Order.css';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";
import swal from 'sweetalert';
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const Order = (props) => {
    const history = useHistory();
    const role = props.role;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function cancelOrder() {
        axios.post('/orders/' + props.id + '/status', {orderStatus: 4}, {headers})
            .then(function (response) {
                toast.success('Order cancelled successfully');
                props.refreshOrders();
            }).catch(error => {
            toast(error.message);
        })
    }

    function confirmCancelOrder() {
        swal({
            title: "Are you sure?",
            text: "Once cancelled, you will not be able to recover this order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    cancelOrder();
                }
            });
    }

    return (
        <section className="Order">
            {isAuthenticated ? null : props.history.push("/login")}
            <h1>Order #{props.id}</h1>
            <div className="Info">
                <div className="name">Status: {props.status}</div>
                <div className="date">Date: {props.createdAt}</div>
                <div className="buyer">{props.buyer.name}</div>
                <div>
                    <span className="bottomButtons">
                        {props.status === 'CANCELLED' ?
                            <span className="btn btn-danger">{props.status}</span>
                            :
                            <button className="btn btn-danger" onClick={confirmCancelOrder}>Cancel Order</button>
                        }

                         <button className="btn btn-info text-white">Update Order Status</button>
                    </span>
                </div>
            </div>
        </section>

    );
}

export default Order;