import React, {Fragment, useState} from 'react'
import Header from '../../components/Header/Header';
import Auth from '../../components/Auth/Auth';
import SignUp from '../../components/Auth/SignUp';
import UserProfile from '../../components/UserProfile/UserProfile';
import {Redirect, Route, Switch} from 'react-router';
import Products from "../../components/Products/Products";
import NewProduct from "../../components/NewProduct/NewProduct";

import {FollowedSellers} from "../../store/FollowedSellers";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import SellerFollow from '../../components/Following/SellerFollow';
import Review from '../../components/Review/Review';
import NewReview from '../../components/Review/NewReview';
import Checkout from "../../components/ShoppingCart/Checkout/Checkout";
import Orders from "../../components/ShoppingCart/Orders/Orders";
import Payments from "../../components/Payments/Payments";
import ReceiptDocument from "../../components/ShoppingCart/ReceiptDocument/ReceiptDocument";

const AuthBlock = () => {
    const {followedSellers, setFollowedSellers} = useState([]);

    return (
        <FollowedSellers.Provider value={{followedSellers, setFollowedSellers}}>
            <Fragment>
                <Header/>
                <Switch>
                    <Route path='/login' component={Auth}/>
                    <Route path='/sign-up' component={SignUp}/>
                    <Route path='/user' component={UserProfile}/>
                    <Route path='/products' component={Products}/>
                    <Route path='/new-product' component={NewProduct}/>
                    <Route path='/sellers' component={SellerFollow}/>
                    <Route path='/review' component={Review}/>
                    <Route path='/new-review' component={NewReview}/>
                    <Route path='/cart' component={ShoppingCart}/>
                    <Route path='/checkout' component={Checkout}/>
                    <Route path='/orders' component={Orders}/>
                    <Route path='/payments' component={Payments}/>
                    <Route path="/receipt" component={ReceiptDocument}/>
                    <Redirect from="/" to='login'/>
                </Switch>
            </Fragment>
        </FollowedSellers.Provider>

    );
}

export default AuthBlock;