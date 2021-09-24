import React from "react";
import '../Product/Product.css';
import axios from "axios";

import Cookies from 'js-cookie';
import toast, {Toaster} from "react-hot-toast";

const SellerCard = (props) => {

    function approveSeller() {

        if (props.status === 'APPROVED') {
            toast.error("User already approved");
        } else {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${Cookies.get('user')}`,
            }

            axios.put('/users/' + props.id, null, {headers})
                .then(r => {
                    toast.success("User approved successfully");
                    props.refreshList();
                    console.log(r)
                }
            ).catch(e => console.log(e));
        }
    }

    return (
        <section className="Product">
            <h1>{props.name}</h1>
            <div className="Info">
                <div className="Price">{props.username}</div>
                <div className="Category">{props.email}</div>

                <button onClick={() => {
                    approveSeller()
                }}>
                    {props.status === 'APPROVED' ? "Approved" :
                        "Approve"
                    }
                </button>
            </div>
            <Toaster position="top-right"/>
        </section>
    );
}

export default SellerCard;