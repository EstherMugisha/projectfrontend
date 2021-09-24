import React, {Fragment, useRef, useContext} from 'react'
import './NewProduct.css'
import axios from "axios";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import APIConfig from '../../store/API-Config';
import Products from '../Products/Products';


const NewProduct = (props) => {
    const APIs= useContext(APIConfig);
    const cartAPI=APIs.cartAPI;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
    const newProductForm = useRef();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function PostDataHandler() {
        const form = newProductForm.current
        const data = {
            title: form['title'].value,
            price: form['price'].value,
            category: form['category'].value
        };
        console.log(data);

        axios.get(cartAPI, data, {headers})
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        axios.post("/products", data, {headers})
            .then(data => {
                console.log('Success:', data);
                props.history.push('/products'); // push will add it to the page stack, replace will just replace the component  // props.history.replace('/posts');
            })
            .catch((error) => {
                console.error('Error:', error);
            }); // to check push, go to google, then newpost and submit, then go back.
    }

    return (
        <Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <div className="NewProduct">
                <form ref={newProductForm}>
                    <h1>Add a Product</h1>
                    <label>name</label>
                    <input type="text" label={'name'} name={'name'}/>

                    <label>Price</label>
                    <input type="text" label={'price'} name={'price'}/>

                    <label>Description</label>
                    <select label={'description'} name={'description'}>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Smartphone">Smartphone</option>
                    </select>
                </form>
                <button onClick={PostDataHandler}>Add Product</button>
            </div>
        </Fragment>
    );
}

export default NewProduct;