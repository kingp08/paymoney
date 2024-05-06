import {combineReducers} from '@reduxjs/toolkit';
import loginUserReducer from '../features/auth/login/loginSlice';
import registrationReducer from '../features/auth/registration/registrationSlice';
import getCurrencies from '../features/slices/getCurrencies/getCurrencies';
import getPreference from '../features/slices/preferenceSlice/preferenceSlice';
import preferenceForProcessedType from '../features/slices/preferenceSlice/preferenceForProcessedType/preferenceForProcessedType';
import getSendMoneyCurrencies from '../features/slices/getCurrencies/getSendMoneyCurrencies';
import getWithdrawSettingsLists from '../features/slices/WithdrawLists/getWithdrawSettingsLists';
import getWithdrawCryptoCurrencies from '../features/slices/getCurrencies/getCryptoCurrencies';
import getAddWithdrawalMethods from '../features/slices/getMethods/getAddWithdrawalMethods';
import withdrawalCurrenciesSlice from '../features/slices/getCurrencies/getWithdrawalCurrencies';
import getDepositMoneyMethods from '../features/slices/getPaymentMethods/getDepositMoneyMethods';
import getDepositBankLists from '../features/slices/getBanksList/getDepositBankList';
import exchangeCurrencies from '../features/slices/exchangeCurrencySlice/exchangeCurrencies';
import getProfile from '../features/slices/user/getProfile/getProfile';
import themeReducer from '../features/slices/themeReducer/themeReducer';
import myWallets from '../features/slices/myWallets/myWallets';
import getDepositMoneyCurrencies from '../features/slices/getCurrencies/getDepositMoneyCurrencies';
import transactions from '../features/slices/transactions/transactions';
import languageReducer from '../features/slices/languageReducer/languageReducer';
import depositConfirm from '../features/slices/depositMoneySlice/paymentConfirm';
import providerStatusReducer from '../features/slices/myWallets/providerStatus';
import systemPreference from '../features/slices/preference/systemPreference';

export const rootReducer = combineReducers({
  loginUserReducer,
  getCurrencies,
  getSendMoneyCurrencies,
  getWithdrawSettingsLists,
  getWithdrawCryptoCurrencies,
  getAddWithdrawalMethods,
  withdrawalCurrenciesSlice,
  registrationReducer,
  getDepositMoneyCurrencies,
  getDepositMoneyMethods,
  getDepositBankLists,
  transactions,
  preference: getPreference,
  preferenceForProcessedType,
  exchangeCurrencies,
  profileReducer: getProfile,
  themeReducer,
  languageReducer,
  myWallets,
  depositConfirm,
  providerStatusReducer,
  systemPreference,
});
