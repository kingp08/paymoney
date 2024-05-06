import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';
const initialState = {
  currencies: null,
  loading: false,
};

export const getExchangeCurrencies = createAsyncThunk(
  'exchangeCurrencies/getAllExchangeCurrencies',
  async obj => {
    const URL = `${config.BASE_URL_VERSION}/exchange-money/get-currencies`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const exchangeCurrencies = createSlice({
  name: 'exchangeCurrencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getExchangeCurrencies.pending, state => {
      state.loading = true;
    });
    builder.addCase(getExchangeCurrencies.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.currencies = payload?.response?.records;
    });
    builder.addCase(getExchangeCurrencies.rejected, state => {
      state.loading = false;
    });
  },
});
export default exchangeCurrencies.reducer;
