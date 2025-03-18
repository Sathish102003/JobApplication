import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from "../services/authService";

const initialState = {
    user: null,
    users: [],
    message: null,
};

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            await authService.register(userData);
            return 'Registration successful.';
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return rejectWithValue(message + " : " + error.response.data[0].description);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            await authService.login(userData);
            return { email: userData.email };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return rejectWithValue(message + " : " + error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.message = 'Logged out successfully';
        },
        clearMessage(state) {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.message = action.payload;
                state.message = 'Registration successful.';
            })
            .addCase(register.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.message = 'Login successful.';
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload;
            });
    }
});

export const {logout, clearMessage} = authSlice.actions;
export default authSlice.reducer;
