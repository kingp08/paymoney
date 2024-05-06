import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {confirmMoneyRequestStyle} from './confirmMoneyRequestStyle';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import MoneyAmountCard from '../../../components/MoneyAmountCard/MoneyAmountCard';
import DetailsCard from './DetailsCard/DetailsCard';
import BottomButton from '../../../components/BottomButton/BottomButton';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {SUCCESS_MONEY_REQUEST} from '../../../../navigation/routeName/routeName';
import {useTranslation} from 'react-i18next';
import {getAllTransactions} from '../../../../features/slices/transactions/transactions';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import config from '../../../../../config';
import {getProfileSummary} from '../../../../features/slices/user/getProfile/getProfile';
import { rs } from '../../../../utils/styles/responsiveSize';
import Loader from '../../../../utils/Loader/Loader';
import { getMyWallets } from '../../../../features/slices/myWallets/myWallets';
const ConfirmMoneyRequest = ({
  route: {
    params: {
      moneyRequest: {
        email,
        currency,
        addNote,
        phone,
        email_or_phone,
        code,
      } = {},
      amount,
    } = {},
  } = {},
  navigation,
}) => {
  const {colors} = useTheme();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {isConnected} = useContext(NetworkContext);
  const {
    preference: {decimal_format_amount, decimal_format_amount_crypto},
  } = useSelector(state => state.preference);
  const [loading, setLoading] = useState(false);
  const {t:trans} = useTranslation();
  const floatAmount = parseFloat(amount).toFixed(
    currency?.type === 'fiat'
      ? decimal_format_amount
      : decimal_format_amount_crypto,
  );
  const styles = confirmMoneyRequestStyle(colors);
  const dispatch = useDispatch();
  const handleSendRequest = async () => {
    setLoading(true);
    if (isConnected) {
      const data = {
        emailOrPhone:
          email || (phone && code && '+' + code + phone) || email_or_phone,
        amount: amount,
        currencyId: currency?.id,
        note: addNote,
      };
      const URL = `${config.BASE_URL_VERSION}/request-money/confirm`;
      const res = await postInfo(data, URL, token, 'POST');
      if (res) {
        if (res?.response?.status?.code === 200) {
          const data = {
            email:
              email || (phone && code && '+' + code + phone) || email_or_phone,
            currency: currency.code,
            amount: floatAmount,
            receiverName: res?.response?.records?.receiverName,
            id: res?.response?.records?.ref_id,
          };
          navigation.navigate(SUCCESS_MONEY_REQUEST, {data});
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
              header={trans('Confirm Request')}
              presentStep={2}
              totalStep={2}
              description={trans('Review the information below before confirmation')}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.contentWidth}
                header={trans('Requesting Amount')}
                amount={floatAmount + ' ' + currency?.code}
              />
            </View>
            <View>
              <DetailsCard
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={{
                  email,
                  email_or_phone,
                  phone,
                  amount: floatAmount,
                  currency,
                  code,
                }}
              />
            </View>

            <View style={styles.detailsCardCont}>
              <Text style={styles.headerText}>{trans('Note')}</Text>
              <Text style={styles.noteText}>{addNote.trim()}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          loading ? (
            <View>
              <Loader
                source={require('../../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
            </View>
          ) : (
            trans('Send Request')
          )
        }
        onPress={!loading ? handleSendRequest : null}
      />
    </>
  );
};

export default ConfirmMoneyRequest;
