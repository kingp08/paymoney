import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postLoginInfo} from './loginApi';
import config from '../../../../config';

const URL = `${config.BASE_URL_VERSION}/login`;
console.log(URL);
const initialState = {
  user: null,
  loginLoader: false,
};

export const loginUser = createAsyncThunk('user', async obj => {
  try {
    const res = await postLoginInfo(obj, URL, 'post');
    return res;
  } catch (err) {}
});

export const loginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    logoutUser: (state, actions) => {
      state.user = null;
      state.loginLoader = false;
    },
    retrieveUser: (state, {payload}) => {
      state.user = payload;
      state.loginLoader = false;
    },
    updateUserInfo: (state, {payload}) => {
      state.user = payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.loginLoader = true;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload: {response}}) => {
      if (response.status.code != 200) {
        state.user = null;
        state.loginLoader = false;
      } else if (response.status.code == 200) {
        state.user = response.records;
        state.loginLoader = false;
      }
    });
    builder.addCase(loginUser.rejected, state => {
      state.loginLoader = false;
    });
  },
});

export const {retrieveUser, logoutUser, updateUserInfo} = loginSlice.actions;

export default loginSlice.reducer;
