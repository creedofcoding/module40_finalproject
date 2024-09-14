import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Apihistograms } from "../../API/Api";

export const Histograms = createAsyncThunk(
    "documents/histograms",
    async ({ accessToken, body }, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ` + accessToken,
                },
            };

            const { data } = await axios.post(Apihistograms, body, header);
            
            console.log(data);

            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                console.log(error.response.data.message);
                return rejectWithValue(error.response.data.message);
            } else {
                console.log(error.message);
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
    histograms: null,
    requestbody: {}
};

const HistogramsSlicer = createSlice({
    name: "histograms",
    initialState,
    reducers: {
        clearHistograms: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.status = null;
            state.histograms = null;
        },
        requestBody: (state, action) => {
            state.requestbody = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Histograms.fulfilled, (state, action) => {
            state.status = "OK";
            state.loading = false;
            state.success = true;
            state.histograms = action.payload;
        });

        builder.addCase(Histograms.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(Histograms.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "BAD";
        });
    },
});

export const { clearHistograms, requestBody } = HistogramsSlicer.actions;
export default HistogramsSlicer.reducer;
