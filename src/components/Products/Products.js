import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './Products.css';
import Product from "../Product/Product";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import {ShowProducts} from "../../store/ShowProducts";
import { APIConfig } from "../../store/API-Config";


const Products = (props) => {
    const APIs= useContext(APIConfig);
    const productAPI=APIs.productAPI;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
    const {showProducts, setShowProducts, allProducts, setAllProducts} = useContext(ShowProducts);

    const [products, setProducts] = useState([]);
    const [displayAllFlag, setDisplayAllFlag] = useState(true);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();

    function fetchProductsHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        axios.get(productAPI, {headers})
            .then(response => {
                setProducts(response.data);
                setAllProducts(response.data)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchProductsHandler, [displayAllFlag]); // This will be fetched when mounted

    const rproducts = products.map(product => {
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
        content = <p> Loading ... </p>;  // BONUS MAKE THIS WAIT FOR A 30 seconds
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
                    displayAllFlag
                        ?
                        <button onClick={displayAllProducts}>Display All Products</button>
                        :
                        <button onClick={displayShownProducts}>Display Shown products</button>
                }

            </section>
            <section className="Products">
                {content}
            </section>
        </React.Fragment>
    );
}


export default Products;
