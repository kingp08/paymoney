import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';
const URL = `${config.BASE_URL_VERSION}/available-balances`;
const initialState = {
  walletsData: [],
  WalletsLoader: false,
  isRefresh:false,
};

export const getMyWallets = createAsyncThunk(
  'wallets/getMyWallets',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    const {status: {code} = {}, records} = response?.response;
    return records;
  },
);
export const refreshMyWallets = createAsyncThunk(
  'wallets/refreshMyWallets',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    const {status: {code} = {}, records} = response?.response;
    return records;
  },
);

const myWallets = createSlice({
  name: 'myWallets',
  initialState,
  reducers: {
    clearWallets: state => {
      state.walletsData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getMyWallets.pending, state => {
      state.WalletsLoader = true;
    });
    builder.addCase(getMyWallets.fulfilled, (state, {payload}) => {
      state.WalletsLoader = false;
      state.walletsData = payload;
    });
    builder.addCase(getMyWallets.rejected, state => {
      state.WalletsLoader = false;
    });
    builder.addCase(refreshMyWallets.pending, state => {
      state.isRefresh = true;
    });
    builder.addCase(refreshMyWallets.fulfilled, (state, {payload}) => {
      state.isRefresh = false;
      state.walletsData = payload;
    });
    builder.addCase(refreshMyWallets.rejected, state => {
      state.isRefresh = false;
    });
  },
});
export const {clearWallets} = myWallets.actions;
export default myWallets.reducer;
