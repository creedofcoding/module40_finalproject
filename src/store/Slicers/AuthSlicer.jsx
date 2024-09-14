import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiLogin } from "../../API/Api";

const header = {
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    },
};

export const UserLogin = createAsyncThunk(
    "auth/userLogin",
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                ApiLogin,
                { login, password },
                header
            );
            localStorage.setItem("userLogin", login);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("expire", data.expire);
            localStorage.setItem("Authenticated", true);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const initialState = {
    loading: false,
    accessToken,
    error: null,
    success: false,
    status: null,
    is_Auth: false
};

const AuthSlicer = createSlice({
    name: "auth",
    initialState,
    reducers: {

        logout: (state) => {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("userLogin")
            localStorage.removeItem("expire")
            localStorage.setItem("Authenticated", false)
            state.loading = false
            state.error = null
            state.success = false
            state.is_Auth = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.status = "OK";
            state.loading = false;
            state.success = true;
            state.is_Auth = true;
        });

        builder.addCase(UserLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(UserLogin.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.status = "BAD";
        });
    },
});

export const { logout } = AuthSlicer.actions
export default AuthSlicer.reducer;
