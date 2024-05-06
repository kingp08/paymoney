import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getInfo} from '../../auth/login/loginApi';
import config from '../../../../config';

const initialState = {
  allTransactions: [],
  loading: true,
  loadMore: true,
  offset: 0,
  order: 'desc',
  limit: 10,
  isRefresh: false,
  totalRecords:0,
};

export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async obj => {
    const {token, limit} = obj;
    const URL = `${
      config.BASE_URL_VERSION
    }/transaction/activityall?offset=0&limit=${
      limit || initialState.limit
    }&type=allTransactions&order=desc`;
    const response = await getInfo(token, URL);
    return response;
  },
);
export const getMoreTransactions = createAsyncThunk(
  'transactions/getMoreTransactions',
  async obj => {
    const {token, URL} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);
const getTransactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    fetchAllTransactions: state => {
      state.isRefresh = true;
      state.loading = true;
    },
    getMyAllTransactionList: (state, {payload}) => {
      state.allTransactions = payload?.response?.records?.transactions;
      state.totalRecords = payload?.response?.records?.totalRecords;
      state.loading = false;
      state.loadMore = true;
      state.isRefresh = false;
      state.order = 'desc';
      state.offset = state.limit;
    },
    changeTransactionStatus: (state, {payload}) => {
      const exits = state.allTransactions.find(item => item.id === payload.id);
      if (exits) {
        exits.status = 'Blocked';
        state.allTransactions = [...state.allTransactions];
      }
    },
    clearTransactions: state => {
      state.allTransactions = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllTransactions.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.loadMore = true;
      state.allTransactions = payload?.response?.records?.transactions;
      state.totalRecords = payload?.response?.records?.totalRecords;
      state.order = 'desc';
      state.offset = state.limit;
    });
    builder.addCase(getAllTransactions.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getMoreTransactions.pending, state => {
      state.loadMore = true;
    });
    builder.addCase(getMoreTransactions.fulfilled, (state, {payload}) => {
      state.loadMore = false;
      state.allTransactions = [
        ...state.allTransactions,
        ...payload?.response?.records?.transactions,
      ];
      state.totalRecords = payload?.response?.records?.totalRecords;
      if (payload?.response?.records?.allTransactions?.length < state.limit) {
        state.offset =
          state.offset + payload?.response?.records?.transactions?.length;
        state.order = 'asc';
      } else {
        state.order = 'desc';
        state.offset = state.offset + state.limit;
      }
    });
    builder.addCase(getMoreTransactions.rejected, state => {
      state.loadMore = false;
    });
  },
});
export const {
  fetchAllTransactions,
  getMyAllTransactionList,
  changeTransactionStatus,
  clearTransactions,
} = getTransactions.actions;
export default getTransactions.reducer;
