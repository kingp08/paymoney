import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postInfo } from "../../auth/login/loginApi";
import config from "../../../../config";

const initialState = {
    data: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null
};

export const depositConfirm = createAsyncThunk(
    'deposit/deposit-confirm',
    async ({body, token}) => {
        const url = `${config.BASE_URL_VERSION}/deposit-money/payment-confirm`;
        const res = await postInfo(body, url, token, 'POST');
        return res?.response;
    }
);

const depositConfirmSlice = createSlice({
    name: 'deposit-confirm',
    initialState,
    extraReducers: builder => {
        builder.addCase(depositConfirm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(depositConfirm.fulfilled, (state, {payload}) => {
            const {status, records} = payload || {};
            if(status?.code == 200) {
                state.data = records;
                state.isSuccess = true;
                state.isError = false;
                state.error = null;
            } else {
                state.isSuccess = false;
                state.isError= true;
                state.error = status?.message
            }
            state.isLoading = false;
        });
        builder.addCase(depositConfirm.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError= true;
            state.error = `Internal Server Error`
        });
    }
});

export default depositConfirmSlice.reducer;