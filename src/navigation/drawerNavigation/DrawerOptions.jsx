import React, {useCallback} from 'react';
import Item from './Item';
import DashboardIcon from '../../assets/svg/drawer-dashboard.svg';
import {
  CREATE_DEPOSIT,
  CREATE_EXCHANGE_CURRENCY,
  CREATE_MONEY_REQUEST,
  CREATE_SEND_MONEY,
  CREATE_WITHDRAW,
  HOME,
  MY_WALLET,
  SETTINGS,
  TRANSACTIONS,
} from '../routeName/routeName';
import DepositIcon from '../../assets/svg/drawer-deposit.svg';
import MyWalletIcon from '../../assets/svg/drawer-myWallet.svg';
import SettingIcon from '../../assets/svg/drawer-setting.svg';
import TransactionIcon from '../../assets/svg/drawer-transactions.svg';
import SendMoneyIcon from '../../assets/svg/drawer-send_money.svg';
import RequestMoneyIcon from '../../assets/svg/drawer-request_money.svg';
import WithdrawalIcon from '../../assets/svg/drawer-withdrawal.svg';
import ExchangeIcon from '../../assets/svg/drawer-exchange.svg';
import {useTranslation} from 'react-i18next';

const DrawerOptions = ({focused, navigation}) => {
  const {t:trans} = useTranslation();
  let isNavigate;
  const handleNavigation = useCallback(route => {
    if (!isNavigate) {
      isNavigate = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate = '';
        navigation.closeDrawer();
      }, 1000);
    }
  }, []);
  return (
    <>
      <Item
        text={trans('Dashboard')}
        routeName={HOME}
        focused={focused}
        navigation={navigation}
        Icon={DashboardIcon}
        onPress={() => handleNavigation(HOME)}
        style={1}
      />
      <Item
        text={trans('Transactions')}
        routeName={TRANSACTIONS}
        focused={focused}
        navigation={navigation}
        Icon={TransactionIcon}
        onPress={() => handleNavigation(TRANSACTIONS)}
      />
      <Item
        text={trans('My Wallet')}
        routeName={MY_WALLET}
        focused={focused}
        navigation={navigation}
        Icon={MyWalletIcon}
        onPress={() => handleNavigation(MY_WALLET)}
      />
      <Item
        text={trans('Deposit Money')}
        routeName={CREATE_DEPOSIT}
        focused={focused}
        navigation={navigation}
        Icon={DepositIcon}
        onPress={() => handleNavigation(CREATE_DEPOSIT)}
      />
      <Item
        text={trans('Send Money')}
        routeName={CREATE_SEND_MONEY}
        focused={focused}
        navigation={navigation}
        Icon={SendMoneyIcon}
        onPress={() => handleNavigation(CREATE_SEND_MONEY)}
      />
      <Item
        text={trans('Request Money')}
        routeName={CREATE_MONEY_REQUEST}
        focused={focused}
        navigation={navigation}
        Icon={RequestMoneyIcon}
        onPress={() => handleNavigation(CREATE_MONEY_REQUEST)}
      />
      <Item
        text={trans('Exchange')}
        routeName={CREATE_EXCHANGE_CURRENCY}
        focused={focused}
        navigation={navigation}
        Icon={ExchangeIcon}
        onPress={() => handleNavigation(CREATE_EXCHANGE_CURRENCY)}
      />
      <Item
        text={trans('Withdrawal')}
        routeName={CREATE_WITHDRAW}
        focused={focused}
        navigation={navigation}
        Icon={WithdrawalIcon}
        onPress={() => handleNavigation(CREATE_WITHDRAW)}
      />
      <Item
        text={trans('Settings')}
        routeName={SETTINGS}
        focused={focused}
        navigation={navigation}
        Icon={SettingIcon}
        onPress={() => handleNavigation(SETTINGS)}
      />
    </>
  );
};

export default DrawerOptions;
