import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';
const URL = `${config.BASE_URL_VERSION}/preference`;
const initialState = {
  preferenceData: {},
  preferenceLoader: false,
  isRefresh:false,
};

export const getPreferences = createAsyncThunk(
  'preferences/getPreferences',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    const {status: {code} = {}, records} = response?.response;
    return records;
  },
);

const preferences = createSlice({
  name: 'Preferences',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPreferences.pending, state => {
      state.preferenceLoader = true;
    });
    builder.addCase(getPreferences.fulfilled, (state, {payload}) => {
      state.preferenceLoader = false;
      state.preferenceData = payload;
    });
    builder.addCase(getPreferences.rejected, state => {
      state.preferenceLoader = false;
    });
  },
});

export default preferences.reducer;