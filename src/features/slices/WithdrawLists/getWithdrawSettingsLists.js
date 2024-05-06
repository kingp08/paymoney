import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  withdrawSettingsList: [],
  settingsListsLoader: false,
};

export const getAllWithdrawSettingsLists = createAsyncThunk(
  'withdraw/getAllWithdrawSettingsLists',
  async obj => {
    const {token, URL} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getWithdrawSettingsLists = createSlice({
  name: 'currencies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAllWithdrawSettingsLists.pending, state => {
      state.settingsListsLoader = true;
    });
    builder.addCase(
      getAllWithdrawSettingsLists.fulfilled,
      (state, {payload}) => {
        state.settingsListsLoader = false;
        state.withdrawSettingsList = payload.response.records;
      },
    );
    builder.addCase(getAllWithdrawSettingsLists.rejected, state => {
      state.settingsListsLoader = false;
    });
  },
});
export default getWithdrawSettingsLists.reducer;
