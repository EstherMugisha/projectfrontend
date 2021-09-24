import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import './Products.css';
import Product from "../Product/Product";
import Cookies from 'js-cookie';
import {useSelector} from "react-redux";
import AllProducts from "../../store/AllProducts";
import { useHistory } from "react-router";
import toast, {Toaster} from "react-hot-toast";


const Products = (props) => {
    const {allProducts, setAllProducts} = useContext(AllProducts);
    const history= useHistory();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false); // indicates that is retreiving data
    const [error, setError] = useState();
    const [role,setRole] = useState("BUYER");

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function fetchProductsHandler() {
        setLoading(true);
        setError(null); // this is to set the error to null, if there were any previous errors existing
        axios.get('/products', {headers})
            .then(response => {
                setProducts(response.data);
                setAllProducts(response.data);
                if(isAuthenticated){
                    setRole(Cookies.get('user_role'));
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })

    }

    useEffect(fetchProductsHandler, []); // This will be fetched when mounted

    function addProductToCart(id) {
        const data = {
            quantity: 1,
            id: id
        }
        axios.post('/cart', data, {headers}).then(function (response) {
            toast.success('Added to Cart');
        }).catch(error => {
            toast(error.message);
        })
    }

    const rproducts = products.map(product => {
        return (
            <Product
                key={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                id={product.id}
                role={role}
                addProductToCart={addProductToCart}
            />)
    });

    let content = <p>No products available</p>;
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

    return (
        <React.Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            {
                role === "SELLER" ?
                <section className="addProduct">
                <button onClick={addProduct}>Add product</button>
                </section>
                : null
            }
                <section className="Products">
                {content}
            </section>
            <Toaster position="top-right"/>
        </React.Fragment>
    );
}


export default Products;
