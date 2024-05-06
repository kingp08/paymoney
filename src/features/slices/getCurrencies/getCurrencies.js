import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';
import config from '../../../../config';
const initialState = {
  data: undefined,
  loading: false,
};

export const getAllCurrencies = createAsyncThunk(
  'currencies/getAllCurrencies',
  async obj => {
    const URL = `${config.BASE_URL_VERSION}/request-money/currencies`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getCurrencies = createSlice({
  name: 'currencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAllCurrencies.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllCurrencies.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.data = payload?.response?.records;
    });
    builder.addCase(getAllCurrencies.rejected, state => {
      state.loading = false;
    });
  },
});
export default getCurrencies.reducer;
