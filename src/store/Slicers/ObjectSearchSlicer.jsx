import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Apiobjectsearch } from "../../API/Api";

export const ObjectSearch = createAsyncThunk(
    "documents/objectSearch",
    async ({ accessToken, body }, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
            };
            const { data } = await axios.post(Apiobjectsearch, body, header);

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
    objectSearch: null,
};

const ObjectSearchSlicer = createSlice({
    name: "objectsearch",
    initialState,
    reducers: {
        clearObjectSearch: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.status = null;
            state.objectSearch = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ObjectSearch.fulfilled, (state, action) => {
            state.status = "OK";
            state.loading = false;
            state.success = true;
            state.objectSearch = action.payload;
        });

        builder.addCase(ObjectSearch.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(ObjectSearch.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "BAD";
        });
    },
});

export const { clearObjectSearch } = ObjectSearchSlicer.actions;
export default ObjectSearchSlicer.reducer;
