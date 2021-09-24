import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./UserProfile.module.css";
import { ShowProducts } from "../../store/ShowProducts";
import axios from "axios";
import Cookies from "js-cookie";

const UserProfile = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // put the name of the slice
  const { showProducts, setShowProducts, allProducts, setAllProducts } =
    useContext(ShowProducts);
  const [points, setPoints] = useState();
  const [userData, setUserData] = useState({ addresses: [] });
  const headers = {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + Cookies.get("user"),
  };
  useEffect(() => {
    console.log(headers);
    const userId = JSON.parse(localStorage.getItem("userInfo")).user;
    setUserData(userId);
    console.log(userId);
    axios
      .get("/points" , headers)
      .then((r) => setPoints(r.data.points))
      .catch((e) => console.log(e));
  }, []);
  const { addresses } = userData;
  console.log("ree", addresses);
  return (
    <React.Fragment>
      <main className="profile">
        {isAuthenticated ? null : props.history.push("/login")}
        <div style={{ textAlign: "center" }}>
          <h2>{userData.username}'s Profile</h2>
        </div>
        <div>
          <h4>Fullname: </h4>
          {userData.name}
        </div>
        <div>
          <h4>User Email:</h4> {userData.email}
        </div>
        <div>
          <h4>Points:</h4> {points}
        </div>
        <div>
          <h4>Address:</h4> {userData.addresses.length}
        </div>
        {console.log(userData.addresses)}
        {userData.addresses.length === 0
          ? console.log("addformhere")
          : userData.addresses.forEach((a) => console.log("heeeeey"))}

        <h4>Number of products: {allProducts.length}</h4>
        <h4>Number of shown products: {showProducts.length}</h4>
      </main>
    </React.Fragment>
  );
};

export default UserProfile;
