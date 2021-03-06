import React, {Fragment, useRef, useContext} from 'react'
import './NewProduct.css'
import axios from "axios";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import APIConfig from '../../store/API-Config';
import Products from '../Products/Products';
import { FormErrors } from './FormErrors';



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
            name: form['name'].value,
            price: form['price'].value,
            description: form['description'].value
        };
        console.log(data);

       
        axios.post("/products", data, {headers})
            .then(data => {
                console.log('Success:', data);
                props.history.push('/products'); 
            })
            .catch((error) => {
                console.error('Error:', error);
            }); 
    }

    return (
        <Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <div className="NewProduct">
            {/* <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
            </div> */}
                <form ref={newProductForm}>
                    <h1>Add a Product</h1>
                    <label>name</label>
                    <input type="text" label={'name'} name={'name'}/>

                    <label>Price</label>
                    <input type="text" label={'price'} name={'price'}/>

                    <label>Description</label>
                    <input type="text" label={'description'} name={'description'}/>
                </form>
                <button onClick={PostDataHandler}>Add Product</button>
            </div>
        </Fragment>
    );
}

export default NewProduct;