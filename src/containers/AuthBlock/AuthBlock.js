import React, {Fragment, useState} from 'react'
import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import UserProfile from '../../components/UserProfile/UserProfile';
import {Redirect, Route, Switch} from 'react-router';
import Products from "../../components/Products/Products";
import NewProduct from "../../components/NewProduct/NewProduct";
import {AllProducts} from "../../store/AllProducts";
import APIConfig from "../../store/API-Config"

const AuthBlock = () => {
    const [allProducts, setAllProducts] = useState([]);
    const base="http://localhost:8080/";

    return (
        <AllProducts.Provider value={{allProducts, setAllProducts}}>
            <APIConfig.Provider value={
                {
                productAPI: base +'products',
                cartAPI: base +'cart',
                
                }
            }>
            <Fragment>
                <Header/>
                <Switch>
                    <Route path='/login' component={Auth}/>
                    <Route path='/user' component={UserProfile}/>
                    <Route path='/products' component={Products}/>
                    <Route path='/new-product' component={NewProduct}/>
                    <Redirect from="/" to='login'/>
                </Switch>
            </Fragment>
           </APIConfig.Provider>
        </AllProducts.Provider>
    );
}

export default AuthBlock;