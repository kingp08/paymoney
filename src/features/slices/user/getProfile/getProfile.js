import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../../auth/login/loginApi';
import config from '../../../../../config';
const initialState = {
  userInfo: {},
  loading: false,
};

export const getProfileSummary = createAsyncThunk(
  'profile/getProfileSummary',
  async obj => {
    const URL = `${config.BASE_URL_VERSION}/profile/details`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    const {records} = response?.response;
    return records;
  },
);

const getProfile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateUserSummerInfo: (state, {payload}) => {
      state.userInfo = payload;
    },
    clearUserSummary: state => {
      state.userInfo = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfileSummary.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProfileSummary.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(getProfileSummary.rejected, state => {
      state.loading = false;
    });
  },
});
export const {updateUserSummerInfo, clearUserSummary} = getProfile.actions;
export default getProfile.reducer;
