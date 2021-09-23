import React, { useContext, useRef } from "react";
import "./Auth.module.css";
import { APIConfig } from "../../store/API-Config";
import axios from "axios";

const SignUp = (props) => {
  const APIs = useContext(APIConfig);
  const userAPI = APIs.userAPI;

  const formData = useRef();

  const SignupHandler = () => {
    const form = formData.current;
    const userInfo = {
      name: form["name"].value,
      email: form["email"].value,
      username: form["user"].value,
      password: form["password"].value,
      role: 1,
    };
    console.log(userInfo);
    const headers = {
      "Access-Control-Allow-Origin": "*"
  }
    axios
      .post(userAPI, userInfo,headers)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    // dispatch(authActions.signup(userInfo));
    // props.history.push("/user");
  };
  return (
    <main className="auth">
      <section>
        <form ref={formData} >
          <div>
            <label htmlFor="name">Fullname</label>
            <input type="text" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>

          <div>
            <label htmlFor="user">Username</label>
            <input type="text" id="user" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label>User Type</label>
            <select htmlFor="utype" name="utype">
              <option value="1">Buyer</option>
              <option value="2">Seller</option>
            </select>
          </div>
          
        </form>
        <button onClick={SignupHandler}>SignUp</button>
      </section>
    </main>
  );
};
export default SignUp;
