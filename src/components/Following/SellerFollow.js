import React,{useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import FollowedSellers from '../../store/FollowedSellers';


const SellerFollow = () => {
    const [sellers, setSellers]=useState([]);
    const [isLoading, setLoading] = useState(false); 
    const [error, setError] = useState();
    const [followStatus, setFollowStatus]=useState(false);
    const [followedSellers, setFollowedSellers]=useContext(FollowedSellers);

    function fetchSellers(){
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${Cookies.get('user')}`,
        }
        setLoading(true);
        setError(null); 
    axios.get('/users/sellers', {headers})
            .then(response => {
                setSellers(response.data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
        }
    useEffect(fetchSellers, [sellers]);

    function follow(id){
        setFollowStatus(true);
        setFollowedSellers(followedSellers.push(id));

     }
    function unfollow(idx){
        setFollowStatus(false);
        setFollowedSellers(followedSellers.filter((seller)=>{seller.id !==idx}))
    }

    const sells = sellers.map((seller)=>{
        return(
        <div>
            {seller.name}
            {followStatus ?
            <button onClick={()=>{unfollow(seller.id)}}>Follow</button>
            :
            <button onClick={()=>{follow(seller.id)}}>Unfollow</button>
            }
        </div>
        )
        }
    )
    const followed=followedSellers.map((seller)=>{
        return(
            seller.name
        )
    })
    return (
        <div>
            <section>
                {sells}
                {followed}
            </section>   
        </div>
    )
}

export default SellerFollow
