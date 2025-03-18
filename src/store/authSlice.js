// src/store/authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import authService from "../services/authService";

const initialState = {
    user: null,
    users: [],
    message: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register(state, action) {
            try {
                authService.register(action.payload);
                state.message = 'Registration successful.';
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                state.message = message;
            }
        },
        login(state, action) {
            try {
                authService.login(action.payload)
                const {email} = action.payload;
                state.user = {email};
                state.message = 'Login successful.';
            } catch (error) {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                state.message = message;
            }
        },
        logout(state) {
            state.user = null;
            state.message = 'Logged out successfully';
        },
        clearMessage(state) {
            state.message = null;
        }
    }
});

export const {register, login, logout, clearMessage} = authSlice.actions;
export default authSlice.reducer;
