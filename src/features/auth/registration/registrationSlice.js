import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import {postLoginInfo} from '../login/loginApi';

const URL = `${config.BASE_URL_VERSION}/registration`;

const initialState = {
  registrationResponse: null,
  registrationLoader: null,
};

export const registerUser = createAsyncThunk('registerUser', async obj => {
  try {
    const res = await postLoginInfo(obj, URL, 'post');
    return res;
  } catch (err) {}
});

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.registrationLoader = true;
    });
    builder.addCase(registerUser.fulfilled, (state, {payload: {response}}) => {
      if (response.status.code != 200) {
        state.registrationResponse = null;
        state.registrationLoader = false;
      } else if (response.status.code == 200) {
        state.registrationResponse = response;
        state.registrationLoader = false;
      }
    });
    builder.addCase(registerUser.rejected, state => {
      state.registrationLoader = false;
    });
  },
});

export default registrationSlice.reducer;
