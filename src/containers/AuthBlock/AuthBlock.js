import React, {Fragment, useState} from 'react'
import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import SignUp from '../../components/Auth/SignUp';
import UserProfile from '../../components/UserProfile/UserProfile';
import {Redirect, Route, Switch} from 'react-router';
import Products from "../../components/Products/Products";
import NewProduct from "../../components/NewProduct/NewProduct";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";

import {AllProducts} from "../../store/AllProducts";

const AuthBlock = () => {
    const [allProducts, setAllProducts] = useState([]);
    return (
        <AllProducts.Provider value={{allProducts, setAllProducts}}>

            <Fragment>
                <Header/>
                <Switch>
                    <Route path='/login' component={Auth}/>
                    <Route path='/sign-up' component={SignUp}/>
                    <Route path='/user' component={UserProfile}/>
                    <Route path='/products' component={Products}/>
                    <Route path='/new-product' component={NewProduct}/>
                    <Route path='/cart' component={ShoppingCart}/>
                    <Redirect from="/" to='login'/>
                </Switch>
            </Fragment>
        </AllProducts.Provider>
    );
}

export default AuthBlock;