import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../drawerNavigation/DrawerNavigation';
import {
  CHANGE_PASSWORD,
  DRAWER_NAVIGATION,
  EDIT_PROFILE,
  ACCOUNT_INFORMATION,
  CONFIRM_DEPOSIT_BANK,
  CREATE_DEPOSIT,
  DEPOSIT_SUCCESS,
  DEPOSIT_USING_BANK,
  DEPOSIT_USING_STRIPE,
  TRANSACTION_FAILED,
  ADD_WITHDRAW_SETTINGS,
  CONFIRM_EXCHANGE_CURRENCY,
  CREATE_EXCHANGE_CURRENCY,
  CONFIRM_MONEY_REQUEST,
  CONFIRM_SEND_MONEY,
  CREATE_MONEY_REQUEST,
  CREATE_SEND_MONEY,
  MONEY_REQUEST_TRANSACTIONS_DETAILS,
  SUCCESS_MONEY_REQUEST,
  SUCCESS_SEND_MONEY,
  CONFIRM_WITHDRAW,
  CREATE_WITHDRAW,
  EDIT_WITHDRAW_SETTINGS,
  SUCCESS_WITHDRAW,
  WITHDRAW_SETTINGS,
  REVIEW_REQUEST,
  SEND_REQUESTED_MONEY,
  SETTINGS,
  SUCCESS_EXCHANGE_CURRENCY,
  SUCCESS_SEND_REQUESTED_MONEY,
  TRANSACTIONS,
  MY_WALLET,
  DEPOSIT_USING_PAYPAL,
  CONFIRM_DEPOSIT,
  PAYMENT_VIEW,
  QR_PAY,
  SCAN_QR_CODE,
  PROFILE_QR_CODE,
  CONFIRM_STANDARD_MERCHANT,
  SUCCESS_MERCHANT_PAYMENT,
  FAILED_MERCHANT_PAYMENT,
  MANAGE_EXPRESS_PAYMENT,
  CONFIRM_EXPRESS_MERCHANT,
  CREATE_SEND_CRYPTO,
  CONFIRM_SEND_CRYPTO,
  SUCCESS_SEND_CRYPTO,
  RECEIVED_CRYPTO,
} from '../routeName/routeName';
import {screenOptions, styles} from '../navigationStyles/navigationStyles';

import {useNavigation, useTheme} from '@react-navigation/native';
import CreateDeposit from '../../screens/Deposit/CreateDeposit/CreateDeposit';

import AccountInformation from '../../screens/Deposit/ConfirmDeposit/Stripe/AccountInformation/AccountInformation';
import DepositUsingStripe from '../../screens/Deposit/ConfirmDeposit/Stripe/DepositUsingStripe';
import DepositUsingBank from '../../screens/Deposit/ConfirmDeposit/Bank/DepositUsingBank';
import ConfirmDepositUsingBank from '../../screens/Deposit/ConfirmDeposit/Bank/ConfirmDepositUsingBank/ConfirmDepositUsingBank';
import DepositSuccess from '../../screens/Deposit/DepositSuccess/DepositSuccess';
import TransactionFailed from '../../screens/Deposit/TransactionFailed/TransactionFailed';
import CreateMoneyRequest from '../../screens/RequestMoney/Create/CreateRequest/CreateMoneyRequest';
import ConfirmMoneyRequest from '../../screens/RequestMoney/Create/ConfirmRequst/ConfirmMoneyRequest';
import MoneyRequestTransactionDetails from '../../screens/RequestMoney/Create/MoneyRequestTransactionDetails/MoneyRequestTransactionDetails';
import SuccessMoneyRequest from '../../screens/RequestMoney/Create/SucessRequest/SuccessMoneyRequest';
import CreateSendMoney from '../../screens/SendMoney/CreateSendMoney/CreateSendMoney';
import ConfirmSendMoney from '../../screens/SendMoney/ConfirmSendMoney/ConfirmSendMoney';
import SucessSendMoney from '../../screens/SendMoney/SucessSendMoney/SucessSendMoney';
import CreateWithdraw from '../../screens/Withdraw/CreateWithdraw/CreateWithdraw';
import ConfirmWithdraw from '../../screens/Withdraw/ConfirmWithdraw/ConfirmWithdraw';
import SuccessWithdraw from '../../screens/Withdraw/SuccessWithdraw/SuccessWithdraw';
import WithdrawSettings from '../../screens/Withdraw/WithdrawSettings/WithdrawSettings';
import AddWithdrawSettings from '../../screens/Withdraw/WithdrawSettings/AddWithdrawSettings';
import EditWithdrawSettings from '../../screens/Withdraw/WithdrawSettings/EditWithdrawSettings';
import Transactions from '../../screens/Transactions/Transactions';
import RequestReview from '../../screens/RequestMoney/Accept/ReviewRequest/RequestReview';
import SendRequestedMoney from '../../screens/RequestMoney/Accept/SendRequestedMoney/SendRequestedMoney';
import SuccessSendRequestedMoney from '../../screens/RequestMoney/Accept/SuccessSendRequestedMoney/SuccessSendRequestedMoney';
import CreateExchangeCurrency from '../../screens/ExchangeCurrency/CreateExchangeCurrency/CreateExchangeCurrency';
import ConfirmExchangeCurrency from '../../screens/ExchangeCurrency/ConfirmExchangeCurrency/ConfirmExchangeCurrency';
import SuccessExchangeCurrency from '../../screens/ExchangeCurrency/SuccessExchangeCurrency/SuccessExchangeCurrency';
import EditProfile from '../../screens/Profile/EditProfile/EditProfile';
import Settings from '../../screens/Settings/Settings';
import ChangePassword from '../../screens/Settings/ChangePassword/ChangePassword';
import {useTranslation} from 'react-i18next';
import MyWallet from '../../screens/MyWallet/MyWallet';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ConfirmPaypal from '../../screens/Deposit/ConfirmDeposit/Paypal/ConfirmPaypal';
import ConfirmDeposit from '../../screens/Deposit/CreateDeposit/ConfirmDeposit';
import PaymentView from '../../screens/Deposit/CreateDeposit/PaymentView';
import BackBtn from '../utils/BackBtn';
import QRPay from '../../screens/QrPay/QRPay';
import ScanQRCode from '../../screens/QrPay/ScanQRCode/ScanQRCode';
import ProfileQRCode from '../../screens/Profile/ProfileQRCode/ProfileQRCode';
import ConfirmStandardPayment from '../../screens/MerchantPayment/StandardMerchant/ConfirmStandardPayment';
import SuccessPayment from '../../screens/MerchantPayment/SuccessPayment/SuccessPayment';
import FailedPayment from '../../screens/MerchantPayment/FailedPayment/FailedPayment';
import ManagePayment from '../../screens/MerchantPayment/ExpressPayment/ManagePayment/ManagePayment';
import ConfirmExpressPayment from '../../screens/MerchantPayment/ExpressPayment/ConfirmExpressPayment/ConfirmExpressPayment';
import LeftArrow from '../../assets/svg/arrow-left.svg'
import { rs } from '../../utils/styles/responsiveSize';
import CreateSendCrypto from '../../screens/SendCrypto/CreateSendCrypto/CreateSendCrypto';
import ConfirmSendCrypto from '../../screens/SendCrypto/ConfirmSendCrypto/ConfirmSendCrypto';
import SuccessSendCrypto from '../../screens/SendCrypto/SuccessSendCrypto/SuccessSendCrypto';
import ReceivedCrypto from '../../screens/ReceivedCrypto/ReceivedCrypto';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const navigation = useNavigation();
  const style = styles(colors)
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions(colors),
        headerBackTitleVisible: false,
        headerLeft: props => <BackBtn props={props} />
      }}>
      <Stack.Screen
        name={DRAWER_NAVIGATION}
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Group>
        <Stack.Screen name={CREATE_DEPOSIT} options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <CreateDeposit {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_DEPOSIT}
          options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <ConfirmDeposit {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={PAYMENT_VIEW}
          options={{
            title: trans('Deposit'),
            headerLeft: (props) => (
              <BackBtn props={props} screen={CREATE_DEPOSIT} />
          ),
          }}>
          {props => (
            <PrivateRoute>
              <PaymentView {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={DEPOSIT_USING_STRIPE}
          options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <DepositUsingStripe {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={ACCOUNT_INFORMATION}
          options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <AccountInformation {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={DEPOSIT_USING_BANK} options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <DepositUsingBank {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_DEPOSIT_BANK}
          options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <ConfirmDepositUsingBank {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={DEPOSIT_SUCCESS} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <DepositSuccess {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={TRANSACTION_FAILED} options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <TransactionFailed {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={DEPOSIT_USING_PAYPAL}
          options={{title: trans('Deposit')}}>
          {props => (
            <PrivateRoute>
              <ConfirmPaypal {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={CREATE_MONEY_REQUEST}
          options={{title: trans('Request Money')}}>
          {props => (
            <PrivateRoute>
              <CreateMoneyRequest {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_MONEY_REQUEST}
          options={{title: trans('Request Money')}}>
          {props => (
            <PrivateRoute>
              <ConfirmMoneyRequest {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={SUCCESS_MONEY_REQUEST}
          options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessMoneyRequest {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={MONEY_REQUEST_TRANSACTIONS_DETAILS}
          options={{title: trans('Transaction Details')}}>
          {props => (
            <PrivateRoute>
              <MoneyRequestTransactionDetails {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={MY_WALLET} options={{title: trans('My Wallet')}}>
          {props => (
            <PrivateRoute>
              <MyWallet {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={CREATE_SEND_MONEY}
          options={{title: trans('Send Money')}}>
          {props => (
            <PrivateRoute>
              <CreateSendMoney {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_SEND_MONEY}
          options={{title: trans('Send Money')}}>
          {props => (
            <PrivateRoute>
              <ConfirmSendMoney {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUCCESS_SEND_MONEY} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SucessSendMoney {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={TRANSACTIONS} options={{title: trans('Transactions')}}>
          {props => (
            <PrivateRoute>
              <Transactions {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={CREATE_WITHDRAW} options={{title: trans('Withdrawal')}}>
          {props => (
            <PrivateRoute>
              <CreateWithdraw {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_WITHDRAW}
          options={{title: trans('Withdrawal')}}>
          {props => (
            <PrivateRoute>
              <ConfirmWithdraw {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUCCESS_WITHDRAW} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessWithdraw {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={WITHDRAW_SETTINGS}
          options={{title: trans('Withdrawal Settings')}}>
          {props => (
            <PrivateRoute>
              <WithdrawSettings {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={ADD_WITHDRAW_SETTINGS}
          options={{title: trans('Add Withdrawal Option')}}>
          {props => (
            <PrivateRoute>
              <AddWithdrawSettings {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={EDIT_WITHDRAW_SETTINGS}
          options={{title: trans('Manage Withdrawal Option')}}>
          {props => (
            <PrivateRoute>
              <EditWithdrawSettings {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={REVIEW_REQUEST}
          options={{title: trans('Accept Request')}}>
          {props => (
            <PrivateRoute>
              <RequestReview {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={SEND_REQUESTED_MONEY}
          options={{title: trans('Accept Request')}}>
          {props => (
            <PrivateRoute>
              <SendRequestedMoney {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={SUCCESS_SEND_REQUESTED_MONEY}
          options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessSendRequestedMoney {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={CREATE_EXCHANGE_CURRENCY}
          options={{title: trans('Exchange Currency')}}>
          {props => (
            <PrivateRoute>
              <CreateExchangeCurrency {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CONFIRM_EXCHANGE_CURRENCY}
          options={{title: trans('Exchange Currency')}}>
          {props => (
            <PrivateRoute>
              <ConfirmExchangeCurrency {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={SUCCESS_EXCHANGE_CURRENCY}
          options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessExchangeCurrency {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={EDIT_PROFILE} options={{title: trans('Edit Profile')}}>
          {props => (
            <PrivateRoute>
              <EditProfile {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={PROFILE_QR_CODE}
          options={{title: trans('Profile QR Code')}}>
          {props => (
            <PrivateRoute>
              <ProfileQRCode {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={SETTINGS} options={{title: trans('Settings')}}>
          {props => (
            <PrivateRoute>
              <Settings {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={CHANGE_PASSWORD}
          options={{title: trans('Change Password')}}>
          {props => (
            <PrivateRoute>
              <ChangePassword {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={QR_PAY} options={{title: trans(QR_PAY)}}>
          {props => (
            <PrivateRoute>
              <QRPay {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SCAN_QR_CODE} options={{title: trans('Scan QR Code')}}>
          {props => (
            <PrivateRoute>
              <ScanQRCode {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={CONFIRM_STANDARD_MERCHANT} options={{title: trans('Merchant Payment')}}>
          {props => (
            <PrivateRoute>
              <ConfirmStandardPayment {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUCCESS_MERCHANT_PAYMENT} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessPayment {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={FAILED_MERCHANT_PAYMENT} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <FailedPayment {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={MANAGE_EXPRESS_PAYMENT} options={{title: trans('Merchant Payment')}}>
          {props => (
            <PrivateRoute>
              <ManagePayment {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={CONFIRM_EXPRESS_MERCHANT} options={{title: trans('Merchant Payment')}}>
          {props => (
            <PrivateRoute>
              <ConfirmExpressPayment {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={CREATE_SEND_CRYPTO} options={{title: trans('Send Crypto')}}>
          {props => (
            <PrivateRoute>
              <CreateSendCrypto {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={CONFIRM_SEND_CRYPTO} options={{title: trans('Send Crypto')}}>
          {props => (
            <PrivateRoute>
              <ConfirmSendCrypto {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUCCESS_SEND_CRYPTO} options={{headerShown: false}}>
          {props => (
            <PrivateRoute>
              <SuccessSendCrypto {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={RECEIVED_CRYPTO} options={{title: trans('Received Crypto')}}>
          {props => (
            <PrivateRoute>
              <ReceivedCrypto {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
