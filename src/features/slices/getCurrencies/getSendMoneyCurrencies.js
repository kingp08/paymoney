import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  data: null,
  loading: false,
};

export const sendMoneyCurrencies = createAsyncThunk(
  'currencies/sendMoneyCurrencies',
  async obj => {
    const {token, URL} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getSendMoneyCurrencies = createSlice({
  name: 'sendMoneyCurrencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(sendMoneyCurrencies.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      sendMoneyCurrencies.fulfilled,
      (state, {payload: {response}}) => {
        state.loading = false;
        state.data = response?.records;
      },
    );
    builder.addCase(sendMoneyCurrencies.rejected, state => {
      state.loading = false;
    });
  },
});
export default getSendMoneyCurrencies.reducer;
