import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Apidocuments } from "../../API/Api";

export const Documents = createAsyncThunk(
    "documents/documents",
    async ( {accessToken, body} , { rejectWithValue }) => {
        
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    'Accept': "application/json",
                    "Authorization":
                        "Bearer " + accessToken,
                },
            };
            const { data } = await axios.post(Apidocuments, body, header);
            
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
    documents: null,
    limitDocs: 0
};

const DocumentsSlicer = createSlice({
    name: "documents",
    initialState,
    reducers: {
        clearDocuments: (state) => {
            state.loading = false
            state.error = null
            state.success = false
            state.status = null
            state.documents = null
        },
        loadMore: (state, action) => {
            state.limitDocs = action.payload;
           
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Documents.fulfilled, (state, action) => {
            state.status = "OK";
            state.loading = false;
            state.success = true;
            state.documents = action.payload;

        });

        builder.addCase(Documents.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(Documents.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "BAD";
        });
    },
});

export const { clearDocuments, loadMore } = DocumentsSlicer.actions
export default DocumentsSlicer.reducer;
