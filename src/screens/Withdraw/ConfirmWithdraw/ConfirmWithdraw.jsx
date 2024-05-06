import {
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';

import MoneyAmountCard from '../../components/MoneyAmountCard/MoneyAmountCard';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {useTheme} from '@react-navigation/native';
import {rs} from '../../../utils/styles/responsiveSize';
import {confirmMoneyRequestStyle} from '../../RequestMoney/Create/ConfirmRequst/confirmMoneyRequestStyle';
import SendDetailsCard from '../../SendMoney/ConfirmSendMoney/SendDetailsCard/SendDetailsCard';
import WithdrawDetailsCard from './WithdrawDetailsCard';
import {SUCCESS_WITHDRAW} from '../../../navigation/routeName/routeName';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import BottomButton from '../../components/BottomButton/BottomButton';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import {useTranslation} from 'react-i18next';
import config from '../../../../config';
import {getAllTransactions} from '../../../features/slices/transactions/transactions';
import {homeStyle} from '../../Home/home.style';
import {getProfileSummary} from '../../../features/slices/user/getProfile/getProfile';
import Loader from '../../../utils/Loader/Loader';
import { getMyWallets } from '../../../features/slices/myWallets/myWallets';

const ConfirmWithdraw = props => {
  const {
    route: {
      params: {
        withdrawInfo,
        setWithdrawInfo,
        initialState,
        selectedCurrency,
        selectedMethod,
        amount,
        setAmount,
      } = {},
    } = {},
    navigation,
  } = props;
  const dispatch = useDispatch();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {payment_method_withdraw} = useSelector(
    state => state.getAddWithdrawalMethods,
  );
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const styles = confirmMoneyRequestStyle(colors);
  const homeStyles = homeStyle(colors);
  const {t:trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  
  const handleWithdraw = async () => {
    if (isConnected) {
      setLoading(true);
      const URL = `${config.BASE_URL_VERSION}/withdrawal/confirm`;
      const data = {
        currency_id: selectedCurrency?.id,
        amount: amount,
        payout_setting_id: selectedMethod?.id,
        totalFees: withdrawInfo.calTotalFees,
      };
      const res = await postInfo(data, URL, token, 'POST');
      if (res?.response?.status?.code === 200) {
        dispatch(getAllTransactions({token}));
        dispatch(getProfileSummary({token}));
        dispatch(getMyWallets({token}));
        navigation.navigate(SUCCESS_WITHDRAW, {
          withdrawInfo,
          setWithdrawInfo,
          initialState,
          selectedCurrency,
          selectedMethod,
          amount,
          setAmount,
        });
      } else {
        setLoading(false);
        switch(res?.response?.status?.code){
          case 403:
            return handleToaster(trans('You are not permitted for this transaction!'), 'error', colors);
          case 400:
            return handleToaster(trans('Your account has been suspended!'), 'error', colors);
          default:
            return handleToaster(trans(res?.response?.status?.message), 'warning', colors);
        }
      }
    } else {
      handleToaster(
        trans('No Internet Connection, please check your network status'),
        'warning',
        colors,
      );
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={homeStyles.safeAreaProvider}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={depositStyle(colors).scroll_view}>
          <View style={depositStyle(colors).container}>
            <TransactionStep
              currentPage={trans('2 of 2')}
              header={trans('Confirm Withdrawal')}
              presentStep={2}
              totalStep={2}
              description={trans('Please review the details before confirming')}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.contentWidth}
                header={trans('Withdrawal Amount')}
                amount={`${withdrawInfo.display_amount} ${selectedCurrency?.code}`}
              />
            </View>
            <View>
              <WithdrawDetailsCard
                title={trans('Details')}
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={
                  selectedMethod?.payment_method?.toString() === payment_method_withdraw?.Bank?.toString()
                    ? {
                        via: selectedMethod?.payment_method,
                        accountHolName: selectedMethod?.account_name,
                        accountNumber: selectedMethod?.account_number,
                        swiftCode: selectedMethod?.swift_code,
                        BankName: selectedMethod?.bank_name,
                      }
                    : {
                        via: selectedMethod?.payment_method,
                      }
                }
              />
            </View>
            <View>
              <SendDetailsCard
                title={trans('Currency')}
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={{
                  sendAmountDisplay: withdrawInfo.display_amount,
                  fee: withdrawInfo.total_fees,
                  totalAmountDisplay: withdrawInfo.total_amount,
                  currency: selectedCurrency?.code,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          !loading ? (
            trans('Withdraw')
          ) : (
            <View>
            <Loader
                source={require('../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
          </View>
          )
        }
        onPress={!loading ? handleWithdraw : null}
      />
    </>
  );
};

export default ConfirmWithdraw;
