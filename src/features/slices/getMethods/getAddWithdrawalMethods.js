import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  addWithdrawalMethodsData: [],
  addWithdrawalMethodsLoading: false,
  payment_method_withdraw :{},
};

export const getWithdrawalMethods = createAsyncThunk(
  'methods/getAddWithdrawalMethods',
  async obj => {
    const {token, url} = obj;
    const response = await getInfo(token, url);
    return response;
  },
);

const getAddWithdrawalMethods = createSlice({
  name: 'methods',
  initialState,
  extraReducers: builder => {
    builder.addCase(getWithdrawalMethods.pending, state => {
      state.addWithdrawalMethodsLoading = true;
    });
    builder.addCase(getWithdrawalMethods.fulfilled, (state, {payload}) => {
      state.addWithdrawalMethodsLoading = false;
      state.addWithdrawalMethodsData = payload.response.records;
      payload.response.records.forEach(({ id, name }) => {
        state.payment_method_withdraw[name] = id;
      })
    });
    builder.addCase(getWithdrawalMethods.rejected, state => {
      state.addWithdrawalMethodsLoading = false;
    });
  },
});
export default getAddWithdrawalMethods.reducer;
