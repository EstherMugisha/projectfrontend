import React,{useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';


const Review = (props) => {
    const [reviews, setReviews]=useState([]);
    const [isLoading, setLoading] = useState(false); 
    const [error, setError] = useState();


    function fetchReviews(){
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        setLoading(true);
        setError(null); 
    axios.get('http://localhost:8080/products/'+props.id+'/review', {headers})
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
        }
    useEffect(fetchReviews, [reviews]);

    const revs = reviews.map((review)=>{
        return(
        <div>
            {review}
        </div>
        )
        }
    )
    
    return (
        <div>
            <section className="review">
                {revs}
            </section>   
        </div>
    )
}

export default Review
