import React, {useContext} from "react";
import './Product.css';
import {AllProducts} from "../../store/AllProducts";
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const Product = (props) => {
    const history = useHistory();
    const role = props.role;
    const {allProducts, setAllProducts} = useContext(AllProducts);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    function removeProductHandler() {
        const index = allProducts.indexOf(props.id)
        setAllProducts(allProducts.filter((item, idx) => idx !== index));
    }

    return (
        <section className="Product">
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="name">{props.name}</div>
                <div className="Price">{props.price}</div>
                <div className="description">{props.description}</div>

                {isAuthenticated ? null : props.history.push("/login")}
                {
                    role === "BUYER" ?
                        <section>
                            <button onClick={() => {
                                props.addProductToCart(props.id)
                            }}>
                                add to cart
                            </button>
                        </section>
                        :
                        <section>
                            <button onClick={() => {
                                removeProductHandler()
                            }}>Remove Product
                            </button>
                        </section>
                }


            </div>
        </section>

    );
}

export default Product;