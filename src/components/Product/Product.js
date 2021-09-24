import React from "react";
import './Product.css';
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";
import axios from "axios";

const Product = (props) => {
    const history = useHistory();
    const role = props.role;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    function removeProductHandler() {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        axios.delete('/products/' + props.id, {headers})
            .then(props.refreshProducts);
    }

    function showReviews() {
        history.push('/review')
    }

    function addReview() {
        history.push('/new-review')
    }

    return (
        <section className="Product">
            {isAuthenticated ? null : props.history.push("/login")}
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="name">{props.name}</div>
                <div className="Price">${props.price}</div>
                <div className="description">{props.description}</div>
                {
                    role === "SELLER" ?
                        <div>
                            <button onClick={() => {
                                removeProductHandler()
                            }}>Remove Product
                            </button>
                        </div>
                        :
                        <div>
                            <div>
                                <button onClick={() => {
                                    props.addProductToCart(props.id)
                                }}>
                                    Add to cart
                                </button>
                            </div>
                            <div>
                                <button onClick={addReview}>Add Review</button>
                            </div>
                        </div>

                }

            </div>
            <div>
                <button onClick={() => {
                    showReviews(props.id)
                }}>check reviews
                </button>
            </div>
        </section>

    );
}

export default Product;