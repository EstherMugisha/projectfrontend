import React, {useContext} from "react";
import './Product.css';
import {ShowProducts} from "../../store/ShowProducts";

const Product = (props) => {
    const {showProducts, setShowProducts} = useContext(ShowProducts);

    function removeProductHandler() {
        const index = showProducts.indexOf(props.id)
        setShowProducts(showProducts.filter((item, idx) => idx !== index));
    }

    return (
        <section className="Product">
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Price">{props.price}</div>
                <div className="Category">{props.category}</div>

                {
                    showProducts.includes(props.id)
                        ?
                        <button onClick={() => {removeProductHandler()}}>
                            Show </button>
                        :
                        <button onClick={() => {
                            console.log(showProducts);
                            setShowProducts([...showProducts, props.id])
                        }}>
                            Hide </button>}

            </div>
        </section>
    );
}

export default Product;