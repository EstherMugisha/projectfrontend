import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.module.css';
import {ShowProducts} from "../../store/ShowProducts";

const UserProfile = (props) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
  const {showProducts, setShowProducts, allProducts, setAllProducts} = useContext(ShowProducts);

  return (
    <React.Fragment>
      <main className="profile">
        {isAuthenticated ? null : props.history.push("/login")}
        <div style={{textAlign:"center"}}>
          <h2>User Profile</h2>
        </div>

        <h4>Number of products: {allProducts.length}</h4>
        <h4>Number of shown products: {showProducts.length}</h4>
      </main>

    </React.Fragment>

  );
};

export default UserProfile;
