import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


// Authentication
const initialAuthState = { isAuthenticated: Cookies.get("user") };

const authSlice = createSlice(
    {
        name: 'authentication',
        initialState: initialAuthState,
        reducers: {
            login(state, action) {
                const userCred = action.payload;
                
                if (Cookies.get('user') != null) {
                    state.isAuthenticated = true
                }
                else {
                    axios.post('/authenticate', userCred)
                    .then(response => {
                        Cookies.set('user', response.data.jwt);
                        localStorage.setItem("userInfo",JSON.stringify(response.data));
                        state.isAuthenticated = true
                        axios.defaults.headers.common = {
                            'Authorization': 'Bearer ' + response.data.jwt
                        };
                    })
                    .catch(err => console.log(err.message))
                }


            },
            logout(state) {
                Cookies.remove('user');
                localStorage.removeItem("userInfo");
                axios.defaults.headers.common = {
                    'Authorization': ''
                };
                state.isAuthenticated = false;
            },
            getCurrentUser(){
                return JSON.parse(localStorage.getItem("UserInfo"));
            }

        }

    }
);

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export const authActions = authSlice.actions;

export default store;
