import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postInfo} from '../../auth/login/loginApi';

const initialState = {
  paymentData: {},
  paymentLoading: false,
};

export const depositMoneyMethods = createAsyncThunk(
  'methods/depositMoneyMethods',
  async obj => {
    const {URL, currency_id, currency_type, transaction_type, token} =
      obj.postPaymentMethod;

    if (URL && currency_id && currency_type && transaction_type && token) {
      const data = {
        currency_id,
        currency_type,
        transaction_type,
      };

      let response = await postInfo(data, URL, token, 'POST');
      return response;
    }
  },
);

const getDepositMoneyMethods = createSlice({
  name: 'depositMoneyMethods',
  initialState,
  extraReducers: builder => {
    builder.addCase(depositMoneyMethods.pending, state => {
      state.paymentLoading = true;
    });
    builder.addCase(
      depositMoneyMethods.fulfilled,
      (state, {payload: {response}}) => {
        if (response) {
          state.paymentLoading = false;
          state.paymentData = response?.records;
        }
      },
    );
    builder.addCase(depositMoneyMethods.rejected, state => {
      state.paymentLoading = false;
    });
  },
});
export default getDepositMoneyMethods.reducer;
