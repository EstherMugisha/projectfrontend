import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


// Authentication
const initialAuthState = { isAuthenticated: false };

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
                    axios.post('http://localhost:8080/authenticate', userCred)
                    .then(response => {
                        Cookies.set('user', response.data.jwt);
                        Cookies.set('user_role', response.data.user.role);
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
                Cookies.remove('user_role');
                axios.defaults.headers.common = {
                    'Authorization': ''
                };
                state.isAuthenticated = false;
            },

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
