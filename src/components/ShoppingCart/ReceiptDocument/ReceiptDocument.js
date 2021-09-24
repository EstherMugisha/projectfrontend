import React, {useEffect, useState} from "react";
import './ReceiptDocument.css';
import {Button} from '@progress/kendo-react-buttons';
import {PDFExport, savePDF} from '@progress/kendo-react-pdf';
import {useRef} from 'react';
import {useLocation} from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";

function ReceiptDocument(props) {
    const location = useLocation();
    const pdfExportComponent = useRef(null);
    const [receiptDetails, setReceiptDetails] = useState({});
    const [orderDetails, setOrderDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const contentArea = useRef(null);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    const handleExportWithFunction = (event) => {
        savePDF(contentArea.current, {paperSize: "A4"});
    }

    function fetchReceiptDetails() {
        setLoading(true);
        setError(null);
        if (location.state == null) {
            props.history.push("/payments")
        } else {
            axios.get('/payments/'+location.state.detail.id, {headers})
                .then(response => {
                    setReceiptDetails(response.data);
                    setOrderDetails(response.data.order);
                    setUserDetails(response.data.order.user);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                })
        }

    }

    useEffect(fetchReceiptDetails,[]);

    return (
        <div className="app-content">
            {isAuthenticated ? null : props.history.push("/login")}
            <PDFExport ref={pdfExportComponent} paperSize="A4">
                <div ref={contentArea}>
                    <p>Thank you {userDetails.name} for shopping with us!!</p>
                    <h2>Receipt</h2>
                    <p><b>Transaction Code:</b> {receiptDetails.transactionCode}</p>
                    <p><b>Transaction Type:</b> {receiptDetails.type}</p>
                    <p><b>Buyer:</b> {userDetails.name}</p>
                    <p><b>Order #</b> {orderDetails.id}</p>
                    <p><b>Amount:</b> {orderDetails.totalPrice}</p>
                    <p><b>Date:</b> {orderDetails.created_at}</p>

                    <div className="button-area">
                        <Button onClick={handleExportWithFunction}>Download Receipt</Button>
                    </div>
                </div>
            </PDFExport>
        </div>
    );
}

export default ReceiptDocument;