import React, {Fragment, useRef, useContext} from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import { FormErrors } from './FormErrors';



const NewReview = (props) => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
    const newReviewForm = useRef();

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${Cookies.get('user')}`,
    }

    function PostReview() {
        const form = newReviewForm.current
        const data = {
            content: form['content'].value,
        };
        console.log(data);

       
        axios.post("/review", data, {headers})
            .then(data => {
                console.log('Success:', data);
                props.history.push('/products'); 
            })
            .catch((error) => {
                console.error('Error:', error);
            }); 
    }

    return (
        <Fragment>
            {isAuthenticated ? null : props.history.push("/login")}
            <div className="NewProduct">
            {/* <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
            </div> */}
                <form ref={newReviewForm}>
                    <h1>Add a Review</h1>
                    <label>content</label>
                    <textarea type="text" label={'content'} name={'content'}/>
                </form>
                <button onClick={PostReview}>Post Review</button>
            </div>
        </Fragment>
    );
}

export default NewReview;