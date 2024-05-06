import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  language: '',
};
const languageReducer = createSlice({
  name: 'languageReducer',
  initialState,
  reducers: {
    updateLanguage: (state, {payload}) => {
      state.language = payload;
      AsyncStorage.setItem('language', payload);
    },
  },
});
export const {updateLanguage} = languageReducer.actions;
export default languageReducer.reducer;
