import {View, KeyboardAvoidingView, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {sendRequestedMoneyStyle} from './sendRequestedMoneyStyle';
import {SUCCESS_SEND_REQUESTED_MONEY} from '../../../../navigation/routeName/routeName';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import MoneyAmountCard from '../../../components/MoneyAmountCard/MoneyAmountCard';
import RecipientDetails from './RecipientDetails/RecipientDetails';
import AmountDetails from './AmountDetails/AmountDetails';
import {useDispatch, useSelector} from 'react-redux';
import BottomButton from '../../../components/BottomButton/BottomButton';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {getAllTransactions} from '../../../../features/slices/transactions/transactions';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import config from '../../../../../config';
import {useContext} from 'react';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import {getProfileSummary} from '../../../../features/slices/user/getProfile/getProfile';
import Loader from '../../../../utils/Loader/Loader';
import { rs } from '../../../../utils/styles/responsiveSize';
import { getMyWallets } from '../../../../features/slices/myWallets/myWallets';
const SendRequestedMoney = ({
  navigation,
  route: {
    params: {
      data: {
        amount,
        email,
        currency,
        currency_id,
        phone,
        note,
        fee,
        id,
        totalAmount,
        currencyType,
      } = {},
    },
  },
}) => {
  const {colors} = useTheme();
  const styles = sendRequestedMoneyStyle(colors);
  const [loading, setLoading] = useState(false);
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();
  const {t:trans} = useTranslation();
  const {
    preference: {decimal_format_amount, decimal_format_amount_crypto},
  } = useSelector(state => state.preference);
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer);
  const handleConfirmRequest = async () => {
    setLoading(true);
    const obj = {
      tr_id: Number(id),
      amount: parseFloat(amount),
      currency_id: Number(currency_id),
      emailOrPhone: email || phone,
    };
    const URL = `${config.BASE_URL_VERSION}/request-money/accept`;
    const res = await postInfo(obj, URL, token, 'POST');
    if (res) {
      if (res?.response?.status?.code === 200) {
        navigation.navigate(SUCCESS_SEND_REQUESTED_MONEY, {
          data: {
            email: email,
            phone: phone,
            amount: parseFloat(totalAmount).toFixed(
              currencyType == 'crypto'
                ? decimal_format_amount_crypto
                : decimal_format_amount,
            ),
            currency: currency,
          },
        });
        dispatch(getAllTransactions({token}));
        dispatch(getProfileSummary({token}));
        dispatch(getMyWallets({token}));
      } else {
        setLoading(false);
        dispatch(getAllTransactions({token}));
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
              header={trans('Review & Accept')}
              presentStep={2}
              totalStep={2}
              description={trans('Review the information below before confirming')}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.width_40}
                header={trans('Requesting Amount')}
                amount={`${parseFloat(amount).toFixed(
                  currencyType == 'crypto'
                    ? decimal_format_amount_crypto
                    : decimal_format_amount,
                )} ${currency}`}
              />
            </View>
            <RecipientDetails
              style={{
                container: styles.cardCont,
                headerText: styles.headerText,
              }}
              data={{
                email: email,
                phone: phone,
              }}
            />
            <AmountDetails
              style={{
                container: styles.cardCont,
                headerText: styles.headerText,
              }}
              data={{
                amount: `${parseFloat(amount).toFixed(
                  currencyType == 'crypto'
                    ? decimal_format_amount_crypto
                    : decimal_format_amount,
                )} ${currency}`,
                fees: fee,
                totalAmount: `${totalAmount} ${currency}`,
              }}
            />
            <View style={styles.cardCont}>
              <Text style={styles.headerText}>{trans('Note')}</Text>
              <Text style={styles.noteText}>{note.trim()}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          !loading ? (
            trans('Accept Request')
          ) : (
            <View>
              <Loader
                source={require('../../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
            </View>
          )
        }
        onPress={!loading && isConnected ? handleConfirmRequest : null}
      />
    </>
  );
};

export default SendRequestedMoney;
