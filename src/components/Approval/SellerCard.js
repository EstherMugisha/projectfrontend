import React, {useContext} from "react";
import '../Product/Product.css';
import axios from "axios";

import Cookies from 'js-cookie';

const SellerCard = (props) => {

    function approveSeller() {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }
        axios.put('http://localhost:8080/users/'+props.id,headers).then(
          r=>console.log(r)
        ).catch(e=>console.log(e));
    }

    return (
        <section className="Product">
            <h1>{props.name}</h1>
            <div className="Info">
                <div className="Price">{props.username}</div>
                <div className="Category">{props.email}</div>
                <button onClick={() => {approveSeller()}}>
                            Approve </button>
            </div>
        </section>
    );
}

export default SellerCard;