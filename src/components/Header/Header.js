import React from 'react';
import './header.css';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../store/index';
import {Link, Redirect} from 'react-router-dom';
import 'react-router';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        <Redirect to='/login'/>;
    }

    return (
        <header className="header">
            <h1>Mini Online Market</h1>
            {isAuthenticated && (<nav>
                <ul>
                    <li>
                        <Link to="/new-product"> Add Product</Link>
                    </li>
                    <li>
                        <Link to="/products">My Products</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/payments">Payments</Link>
                    </li>
                    <li>
                        <Link to="/user"> Profile </Link>
                    </li>
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>)}

        </header>
    );
};

export default Header;
