import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {getInfo} from '../../auth/login/loginApi';

const initialState = {
  preference: null,
  loading: false,
};

export const getAllPreference = createAsyncThunk(
  'preference/getAllPreference',
  async obj => {
    const URL = `${config.BASE_URL_VERSION}/preference`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const getPreference = createSlice({
  name: 'preference',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAllPreference.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllPreference.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.preference = payload?.response?.records;
    });
    builder.addCase(getAllPreference.rejected, state => {
      state.loading = false;
    });
  },
});
export default getPreference.reducer;
