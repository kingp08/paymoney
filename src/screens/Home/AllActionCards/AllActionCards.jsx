import {Dimensions, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {
  CREATE_DEPOSIT,
  CREATE_EXCHANGE_CURRENCY,
  CREATE_MONEY_REQUEST,
  CREATE_SEND_MONEY,
  TRANSACTIONS,
  CREATE_WITHDRAW,
} from '../../../navigation/routeName/routeName';
import Transaction from '../../../assets/svg/transactionCalculator.svg';
import Deposit from '../../../assets/svg/deposit-money.svg';
import SendMoney from '../../../assets/svg/sendMoney.svg';
import Withdraw from '../../../assets/svg/withdraw.svg';
import RequestMoney from '../../../assets/svg/requestMoney.svg';
import Exchange from '../../../assets/svg/exchange.svg';
import ActionsCard from '../../components/ActionsCard/ActionsCard';
import {rs} from '../../../utils/styles/responsiveSize';
import {useTranslation} from 'react-i18next';
const {width} = Dimensions.get('screen');
const AllActionCards = ({style, isNavigate, navigation}) => {
  const {t:trans} = useTranslation();
  const handleNavigation = useCallback(route => {
    if (!isNavigate.current) {
      isNavigate.current = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate.current = '';
      }, 1000);
    }
  }, []);
  return (
    <View style={style}>
      <ActionsCard
        icon={<Deposit />}
        text={trans('Deposit Money')}
        onPress={() => handleNavigation(CREATE_DEPOSIT)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        icon={<Withdraw />}
        text={trans('Withdraw')}
        onPress={() => handleNavigation(CREATE_WITHDRAW)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        icon={<SendMoney />}
        text={trans('Send Money')}
        onPress={() => handleNavigation(CREATE_SEND_MONEY)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        icon={<RequestMoney />}
        text={trans('Request Money')}
        onPress={() => handleNavigation(CREATE_MONEY_REQUEST)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        icon={<Exchange />}
        text={trans('Exchange')}
        onPress={() => handleNavigation(CREATE_EXCHANGE_CURRENCY)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        icon={<Transaction />}
        text={trans('Transactions')}
        onPress={() => handleNavigation(TRANSACTIONS)}
        fixedWidth={width / 2 - rs(26)}
      />
    </View>
  );
};

export default memo(AllActionCards);
