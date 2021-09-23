import React, { useRef } from 'react';
import './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index';
import axios from 'axios';


const SignUp = (props) => {
  const dispatch = useDispatch();
  const formData = useRef();

  const SignupHandler = () => {
    const form = formData.current
    const userInfo = { name: "l",email:"r@t.v",username: "k", password: "h", role: 1 };
    console.log(userInfo);
        axios.post('/users',userInfo).then(
          data=>{console.log(data)}
        ).catch((error)=>console.error(error));
    // dispatch(authActions.signup(userInfo));
    // props.history.push("/user");
  }
  return (
    <main className="auth">
      <section>
        <form ref={formData} onSubmit={SignupHandler}>
        <div >
            <label htmlFor='name'>Fullname</label>
            <input type='text' id='name' />
          </div>
        <div >
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          
          <div >
            <label htmlFor='user'>Username</label>
            <input type='text' id='user' />
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <div>
          <label>User Type</label>
      <select htmlFor='utype' name='utype'>
        <option value="1">Buyer</option>
        <option value="2">Seller</option>
      </select>
          </div>
          <button>SignUp</button>
        </form>
      </section>
    </main>
  );
};
export default SignUp;