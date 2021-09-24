import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import '../Product/Product.css';
import SellerCard from "./SellerCard";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {ShowProducts} from "../../store/ShowProducts";
import { APIConfig } from "../../store/API-Config";


const ApproveSeller = (props) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 
   

    const [pendingSellers, setSellers] = useState([]);
    const [displayAllFlag, setDisplayAllFlag] = useState(true);    
    const [isLoading, setLoading] = useState(false); 
    const [error, setError] = useState();

    function getPendingSellers() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        axios.get('/users/sellers/pending', {headers})
            .then(response => {
                setSellers(response.data);
                // setAllProducts(response.data)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(getPendingSellers, [displayAllFlag]); // This will be fetched when mounted

    const rproducts = pendingSellers.map(s => {
        return (
            <SellerCard
                key={s.id}
                name={s.name}
                username={s.username}
                email={s.email}
                id={s.id}
            />)
    });

    let content = <p>No pending sellers </p>;
    if (rproducts.length > 0) {
        content = rproducts;
    } else if (error) {
        content = <p>{error}</p>;
    } else if (isLoading) {
        content = <p> Loading ... </p>;  
    }

    function displayShownProducts() {
        console.log("ananda");
        setDisplayAllFlag(true);
    }

    function displayAllProducts() {
        console.log("ananda 2");
        setDisplayAllFlag(false);
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <section className="ProductsButton">
                {
                    // displayAllFlag
                    //     ?
                    //     <button onClick={displayAllProducts}>Display All Products</button>
                    //     :
                    //     <button onClick={displayShownProducts}>Display Shown products</button>
                }

            </section>
            <section className="Products">
                {content}
            </section>
        </React.Fragment>
    );
}


export default ApproveSeller;
