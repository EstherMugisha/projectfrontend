import React, {useContext} from "react";
import './Order.css';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const Order = (props) => {
    const history = useHistory();
    const role = props.role;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <section className="Order">
            {isAuthenticated ? null : props.history.push("/login")}
            <h1>Order #{props.id}</h1>
            <div className="Info">
                <div className="name">Status: {props.status}</div>
                <div className="date">Date: {props.createdAt}</div>
                <div className="buyer">{props.buyer.name}</div>


                {/*{*/}
                {/*    role === "BUYER" ?*/}
                {/*        <section>*/}
                {/*            <button onClick={() => {*/}
                {/*                props.addProductToCart(props.id)*/}
                {/*            }}>*/}
                {/*                add to cart*/}
                {/*            </button>*/}
                {/*        </section>*/}
                {/*        :*/}
                {/*        <section>*/}
                {/*            <button onClick={() => {*/}
                {/*                removeProductHandler()*/}
                {/*            }}>Remove Product*/}
                {/*            </button>*/}
                {/*        </section>*/}
                {/*}*/}


            </div>
        </section>

    );
}

export default Order;