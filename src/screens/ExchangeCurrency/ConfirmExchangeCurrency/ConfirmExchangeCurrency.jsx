import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import {confirmExchangeCurrencyStyle} from './confirmExchangeCurrency.style';
import {useTheme} from '@react-navigation/native';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import MoneyAmountCard from '../../components/MoneyAmountCard/MoneyAmountCard';
import ExchangeDetails from './ExchangeDetails/ExchangeDetails';
import {SUCCESS_EXCHANGE_CURRENCY} from '../../../navigation/routeName/routeName';
import BottomButton from '../../components/BottomButton/BottomButton';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getAllTransactions} from '../../../features/slices/transactions/transactions';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import {getProfileSummary} from '../../../features/slices/user/getProfile/getProfile';
import { rs } from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
import { getMyWallets } from '../../../features/slices/myWallets/myWallets';

const ConfirmExchangeCurrency = ({
  route: {
    params: {
      amount,
      exchangeCurrencyInfo,
      fromCurrency,
      subTotal,
      rate,
      toFixed,
      totalAmountDisplay,
      totalFeesDisplay,
    },
  },
  navigation,
}) => {
  const {colors} = useTheme();
  const {isConnected} = useContext(NetworkContext);
  const {toCurrency} = exchangeCurrencyInfo || {};
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer);
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const styles = confirmExchangeCurrencyStyle(colors);
  const [loading, setLoading] = useState(false);
  const handleConfirmExchange = async () => {
    if ((amount, toCurrency?.id, fromCurrency?.id && isConnected)) {
      setLoading(true);
      const URL = `${config.BASE_URL_VERSION}/exchange-money/complete`;
      const obj = {
        to_currency_id: toCurrency?.id,
        from_currency_id: fromCurrency?.id,
        amount: amount,
      };
      const res = await postInfo(obj, URL, token, 'POST');
      if (res) {
        if (res?.response?.status?.code === 200) {
          navigation.navigate(SUCCESS_EXCHANGE_CURRENCY, {
            data: {
              total_amount_formatted:
                parseFloat(amount).toFixed(toFixed) + ' ' + fromCurrency?.code,
              total_fees_formatted: !(totalFeesDisplay > 0)
                ? 0
                : totalFeesDisplay + ' ' + fromCurrency?.code,
              destination_amount_formatted: subTotal + ' ' + toCurrency?.code,
            },
          });
          dispatch(getAllTransactions({token}));
          dispatch(getProfileSummary({token}));
          dispatch(getMyWallets({token}));
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
      }
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll_view}>
          <View style={styles.container}>
            <TransactionStep
              currentPage={trans('{{x}} of {{y}}', {
                x: 2,
                y: 2,
              })}
              header={trans('Confirm Exchange')}
              presentStep={2}
              totalStep={2}
              description={`${trans('Based on exchange rate')}: 1 ${
                fromCurrency.code
              } = ${rate} ${toCurrency.code}`}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.width_40}
                header={trans('Exchanged Amount')}
                amount={`${subTotal} ${toCurrency.code}`}
              />
            </View>
            <ExchangeDetails
              style={{
                container: styles.detailsCardCont,
                headerText: styles.headerText,
                pb_4: styles.pb_4,
              }}
              data={{
                exchangeCurrencyInfo,
                amount,
                subTotal,
                toFixed,
                totalAmountDisplay,
                totalFeesDisplay,
                fromCurrency,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          !loading ? (
            trans('Confirm')
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
        onPress={!loading ? handleConfirmExchange : null}
      />
    </>
  );
};

export default ConfirmExchangeCurrency;
