import React, { useRef } from 'react';
import './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index';
import { Link } from 'react-router-dom';

const Auth = (props) => {
  
  const dispatch = useDispatch();
  const formData = useRef();

  const loginHandler = () => {
    const form = formData.current
    const userCredentials = { username: form['user'].value, password: form['password'].value };
        
    dispatch(authActions.login(userCredentials));
    props.history.push("/products");
  }

  return (
    <main className="auth">
      <section>
        <form ref={formData} onSubmit={loginHandler}>
          <div >
            <label htmlFor='user'>User</label>
            <input type='text' id='user' />
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
          <div>Dont have an account yet? <div><Link to="/sign-up">Sign Up</Link></div> </div>
        </form>
      </section>
    </main>
  );
};

export default Auth;
