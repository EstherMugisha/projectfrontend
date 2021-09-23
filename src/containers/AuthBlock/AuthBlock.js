import React, {Fragment, useState} from 'react'
import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import SignUp from '../../components/Auth/SignUp';
import UserProfile from '../../components/UserProfile/UserProfile';
import {Redirect, Route, Switch} from 'react-router';
import Products from "../../components/Products/Products";
import NewProduct from "../../components/NewProduct/NewProduct";
import {ShowProducts} from "../../store/ShowProducts";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import APIConfig from "../../store/API-Config";

const AuthBlock = () => {
    const [showProducts, setShowProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    // const base = "http://localhost:8081/";

    return (
        <ShowProducts.Provider value={{showProducts, setShowProducts, allProducts, setAllProducts}}>
            {/*<APIConfig.Provider value={*/}
            {/*    {*/}
            {/*        productAPI: base + 'products',*/}
            {/*        cartAPI: base + 'cart',*/}
            {/*    }*/}
            {/*}>*/}
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
            {/*</APIConfig.Provider>*/}
        </ShowProducts.Provider>
    );
}

export default AuthBlock;