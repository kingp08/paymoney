import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';

const URL = `${config.BASE_URL_VERSION}/deposit-money/get-currencies`;

const initialState = {
  data: [],
  loading: false,
};

export const depositMoneyCurrencies = createAsyncThunk(
  'currencies/depositMoneyCurrencies',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getDepositMoneyCurrencies = createSlice({
  name: 'depositMoneyCurrencies',
  initialState,
  reducers: {
    clearDepositData: (state, actions) => {
      state.data = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(depositMoneyCurrencies.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      depositMoneyCurrencies.fulfilled,
      (state, {payload: {response}}) => {
        state.loading = false;
        state.data = response.records;
      },
    );
    builder.addCase(depositMoneyCurrencies.rejected, state => {
      state.loading = false;
    });
  },
});

export const {clearDepositData} = getDepositMoneyCurrencies.actions;
export default getDepositMoneyCurrencies.reducer;
