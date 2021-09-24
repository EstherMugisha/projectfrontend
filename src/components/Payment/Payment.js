import React from "react";
import './Payment.css';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";

const Payment = (props) => {
    const history = useHistory();
    const role = props.role;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    function generateReceipt() {
        history.push({
            pathname: '/receipt',
            state: {detail: props}
        });
    }

    return (
        <section className="Payment">
            {isAuthenticated ? null : props.history.push("/login")}
            <h1>Order # {props.order.id}</h1>
            <div className="Info">
                <div className="Price"><b>Transaction Code:</b> {props.transactionCode}</div>
                <div className="code"><b>Type:</b> {props.type}</div>
                <div className="description"><b>Date:</b> {props.createdAt}</div>
                <div className="description"><b>Buyer:</b> {props.order.user.name}</div>
                <div>
                    <button className="btn btn-info text-white" onClick={generateReceipt}>Generate Receipt</button>
                </div>
            </div>
        </section>

    );
}

export default Payment;