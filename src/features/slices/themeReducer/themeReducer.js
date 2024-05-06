import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  theme: '',
};

const themeReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    updateTheme: (state, {payload}) => {
      state.theme = payload;
      AsyncStorage.setItem('theme', payload);
    },
  },
});
export const {updateTheme} = themeReducer.actions;
export default themeReducer.reducer;
