import React, {useEffect, useState} from "react";
import axios from 'axios';
import './Payments.css';
import Payment from "../Payment/Payment";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Toaster} from "react-hot-toast";

const Payments = (props) => {
    const history = useHistory();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice

    const [payments, setPayments] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function fetchPaymentsHandler() {
        setLoading(true);
        setError(null);
        axios.get('/payments', {headers})
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchPaymentsHandler, []);

    const rpayments = payments.map(payment => {
        return (
            <Payment
                key={payment.id}
                transactionCode={payment.transactionCode}
                type={payment.type}
                createdAt={payment.created_at}
                id={payment.id}
                order={payment.order}
            />)
    });

    let content = <p>No payments available</p>;
    if (rpayments.length > 0) {
        content = rpayments;
    } else if (error) {
        content = <p>{error}</p>;
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <section className="Payments">
                {content}
            </section>
            <Toaster position="top-right"/>
        </React.Fragment>
    );
}


export default Payments;
