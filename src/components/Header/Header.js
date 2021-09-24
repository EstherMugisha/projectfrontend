import React ,{useEffect, useState} from 'react';
import './header.css';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../store/index';
import {Link, Redirect} from 'react-router-dom';
import 'react-router';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
    const dispatch = useDispatch();
    const [role, setRole] = useState({role: 'BUYER'});

    const logoutHandler = () => {
        dispatch(authActions.logout());
        <Redirect to='/login'/>;
    }
    useEffect(() => {
        const userRole = JSON.parse(localStorage.getItem("userInfo")).user.role;
        setRole(userRole);
        console.log(userRole)
        
      }, []);

    return (
        <header className="header">
            <h1>Mini Online Market</h1>
            {isAuthenticated && (<nav>
                <ul>
                    {role=='ADMIN'? 
                   
                <li>
                        <Link to="/approve-sellers"> Approve Sellers</Link>
                    </li>
                     :null}
                    {role=='SELLER'? 
                    <li>
                        <Link to="/new-product"> Add Product</Link>
                    </li>
                    :null}
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    {role=='BUYER'? 
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    :null}
                    {role=='ADMIN'? null:
                    <li>
                        <Link to="/user"> Profile </Link>
                    </li>
                    }
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>)}

        </header>
    );
};

export default Header;
