import React, {useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import './CartItem.css';
import 'bootstrap/dist/css/bootstrap.css';

const CartItem = (props) => {
    const [quantity, setQuantity] = useState();

    function add() {
        setQuantity(quantity + 1);
        props.handleAddToCart(props.id);
    }

    function subtract() {
        setQuantity(quantity - 1);
        props.handleRemoveFromCart(props.id);
    }

    return (
        <div>
            <div className="row form-group">
                <div className="col-sm-6">
                    <h4>{props.name}: ${props.price}</h4>
                </div>
                <div className="col-sm-2 text-right">quantity: {props.quantity}</div>
            </div>
            <div className="row btn-toolbar">
                <div className="col-6">
                    <button className="btn btn-outline-primary">
                        show info
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-primary" onClick={add}>
                        +1
                    </button>
                    <button className="btn btn-outline-primary" onClick={subtract}
                            disabled={quantity < 1}>
                        -1
                    </button>
                </div>
            </div>
            <hr/>
            <Toaster position="top-right"/>
        </div>
    );
}

export default CartItem;