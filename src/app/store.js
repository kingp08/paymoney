import {configureStore} from '@reduxjs/toolkit';
import {handleLogOut} from '../screens/utilities/handleLogout/handleLogout';
import {rootReducer} from './rootReducer';

const check = store => next => action => {
  const response = action?.payload;
  const {response: {status: {code, message} = {}} = {}, message: authMessage} =
    response || {};
  if (
    (code === 403 && message === 'Inactive') ||
    authMessage === 'Unauthenticated.'
  ) {
    handleLogOut(store.dispatch);
  }

  return next(action);
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(check),
  devTools: process.env.NODE_ENV !== 'production',
});
