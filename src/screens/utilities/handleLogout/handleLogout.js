import {logoutUser} from '../../../features/auth/login/loginSlice';
import {clearDepositData} from '../../../features/slices/getCurrencies/getDepositMoneyCurrencies';
import { clearWallets } from '../../../features/slices/myWallets/myWallets';
import {clearTransactions} from '../../../features/slices/transactions/transactions';
import {clearUserSummary} from '../../../features/slices/user/getProfile/getProfile';

export const handleLogOut = dispatch => {
  dispatch(logoutUser());
  dispatch(clearDepositData());
  dispatch(clearTransactions());
  dispatch(clearUserSummary());
  dispatch(clearWallets());
};
