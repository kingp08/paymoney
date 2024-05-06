import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postInfo} from '../../auth/login/loginApi';

const initialState = {
  bankLists: [],
  bankListsLoader: false,
};

export const depositBankLists = createAsyncThunk(
  'methods/depositBankLists',
  async obj => {
    const {data, token, URL} = obj;
      let response = await postInfo(data, URL, token, 'POST');
      return response;
  },
);

const getDepositBankLists = createSlice({
  name: 'depositBankLists',
  initialState,
  extraReducers: builder => {
    builder.addCase(depositBankLists.pending, state => {
      state.bankListsLoader = true;
    });
    builder.addCase(
      depositBankLists.fulfilled,
      (state, {payload: {response}}) => {
        if (response) {
          state.bankListsLoader = false;
          state.bankLists = response?.records;
        }
      },
    );
    builder.addCase(depositBankLists.rejected, state => {
      state.bankListsLoader = false;
    });
  },
});
export default getDepositBankLists.reducer;
