import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../../auth/login/loginApi';
import config from '../../../../../config';
const initialState = {
  processedBy: null,
  loading: false,
};

export const checkProcessedPreference = createAsyncThunk(
  'processedPreference/checkProcessedPreference',
  async obj => {
    const URL = `${config.BASE_URL_VERSION}/preference/check-processed-by`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const preferenceForProcessedType = createSlice({
  name: 'processedPreference',
  initialState,
  extraReducers: builder => {
    builder.addCase(checkProcessedPreference.pending, state => {
      state.loading = true;
    });
    builder.addCase(checkProcessedPreference.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.processedBy = payload?.response?.records;
    });
    builder.addCase(checkProcessedPreference.rejected, state => {
      state.loading = false;
    });
  },
});
export default preferenceForProcessedType.reducer;
