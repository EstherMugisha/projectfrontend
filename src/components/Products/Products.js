import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './Products.css';
import Product from "../Product/Product";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import { useHistory } from "react-router";
import { Link, Route } from "react-router-dom";
import Review from "../Review/Review";


const Products = (props) => {
    const history=useHistory();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [role,setRole] = useState("BUYER");

    function fetchProductsHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
        }
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        axios.get('http://localhost:8080/products', {headers})
            .then(response => {
                setProducts(response.data);
                //setAllProducts(response.data);
                if(isAuthenticated){
                    setRole(Cookies.get('user_role'));
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchProductsHandler, [products]); // This will be fetched when mounted

    const rproducts = products.map(product => {
        return (
            <section>
            <Product
                key={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                id={product.id}
                role={role}
              />

              <Review
              key={product.id}
              id={product.id}
              />
              </section>
        )
              
    });

    let content = <p>No posts available</p>;
    if (rproducts.length > 0) {
        content = rproducts;
    } else if (error) {
        content = <p>{error}</p>;
    } else if (isLoading) {
        content = <p> Loading ... </p>;  // BONUS MAKE THIS WAIT FOR A 30 seconds
    }

    function addProduct() {
        history.push('/new-product');
    }

    function displayAllProducts() {
        console.log("ananda 2");
    }

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            {
                role == "SELLER" ?
                <section className="addProduct">
                <button onClick={addProduct}>Add product</button>
                </section>
                : null
              
            }
                <section className="Products">
                {content}
            </section>
        </React.Fragment>
    );
}


export default Products;
