import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  cryptoData: [],
  cryptoLoading: false,
};

export const getCryptoCurrencies = createAsyncThunk(
  'currencies/getCryptoCurrencies',
  async obj => {
    const {token, URL} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getWithdrawCryptoCurrencies = createSlice({
  name: 'getCryptoCurrencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getCryptoCurrencies.pending, state => {
      state.cryptoLoading = true;
    });
    builder.addCase(getCryptoCurrencies.fulfilled, (state, {payload}) => {
      state.cryptoLoading = false;
      state.cryptoData = payload.response.records;
    });
    builder.addCase(getCryptoCurrencies.rejected, state => {
      state.cryptoLoading = false;
    });
  },
});
export default getWithdrawCryptoCurrencies.reducer;
