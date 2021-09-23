import React, {Fragment, useState} from 'react'
import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import UserProfile from '../../components/UserProfile/UserProfile';
import {Redirect, Route, Switch} from 'react-router';
import Products from "../../components/Products/Products";
import NewProduct from "../../components/NewProduct/NewProduct";
import {ShowProducts} from "../../store/ShowProducts";

const AuthBlock = () => {
    const [showProducts, setShowProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    return (
        <ShowProducts.Provider value={{showProducts, setShowProducts, allProducts, setAllProducts}}>
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
        </ShowProducts.Provider>
    );
}

export default AuthBlock;