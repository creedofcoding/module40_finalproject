import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUserInfo } from "../../API/Api";

export const UserInfo = createAsyncThunk(
    "user/userInfo",
    async ( accessToken , { rejectWithValue }) => {
        
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    'Accept': "application/json",
                    "Authorization":
                        "Bearer " + accessToken,
                },
            };
            const { data } = await axios.get(ApiUserInfo, header);

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

const initialState = {
    loading: false,
    error: null,
    success: false,
    status: null,
    userInfo: null,
    is_Auth: false,
};

const UserInfoSlicer = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        clearUserInfo: (state) => {
            state.loading = false
            state.error = null
            state.success = false
            state.status = null
            state.userInfo = null
            state.is_Auth = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(UserInfo.fulfilled, (state, action) => {
            state.status = "OK";
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload;
            state.is_Auth = true;

        });

        builder.addCase(UserInfo.pending, (state) => {
            state.loading = true;
            state.is_Auth = false;
            state.error = null;
        });

        builder.addCase(UserInfo.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "BAD";
            state.is_Auth = false;
        });
    },
});

export const { clearUserInfo } = UserInfoSlicer.actions
export default UserInfoSlicer.reducer;
