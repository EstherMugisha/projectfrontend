import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {useHistory} from "react-router";

const StripeCheckoutButton = ({price}) => {
    const history = useHistory();
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb';

    const onToken = token => {
        console.log(token);
        processPaymentFrom(token);
    };

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function processPaymentFrom(token) {
        const data = {
            transactionCode: token.id,
            addressCity: token.card.address_city,
            addressCountry: token.card.address_country,
            addressState: token.card.address_state,
            addressZip: token.card.address_zip,
            email: token.email,
            type: token.type
        }
        console.log(data);

        axios.post('/cart/process', data, {headers}).then(function (response) {
            //add to global cart
            toast.success('Payment processed successfully. Once delivered, you will earn yourself 10 points!!!');
            //go to orders now
            history.push('/orders');
        }).catch(error => {
            toast(error.message);
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='MIU Online Market'
            billingAddress
            shippingAddress
            image='https://d3hk6w1rfu80ox.cloudfront.net/media/uploads/listings/maharishi-university-of-management/BjEDngeudfgo.jpg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;