import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo, postInfo} from '../../auth/login/loginApi';

const initialState = {
  withdrawalCurrencyData: [],
  withdrawalCurrencyLoader: false,
};

export const getWithdrawalCurrencies = createAsyncThunk(
  'currencies/getWithdrawalCurrencies',
  async obj => {
    const {URL, data, token, method} = obj;
    const res = await postInfo(data, URL, token, 'POST');
    return res;
  },
);

const withdrawalCurrenciesSlice = createSlice({
  name: 'withdrawalCurrencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getWithdrawalCurrencies.pending, state => {
      state.withdrawalCurrencyLoader = true;
    });
    builder.addCase(getWithdrawalCurrencies.fulfilled, (state, {payload}) => {
      state.withdrawalCurrencyLoader = false;
      state.withdrawalCurrencyData = payload.response.records;
    });
    builder.addCase(getWithdrawalCurrencies.rejected, state => {
      state.withdrawalCurrencyLoader = false;
    });
  },
});
export default withdrawalCurrenciesSlice.reducer;
