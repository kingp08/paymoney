import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {SUCCESS_SEND_MONEY} from '../../../navigation/routeName/routeName';
import MoneyAmountCard from '../../components/MoneyAmountCard/MoneyAmountCard';
import {confirmMoneyRequestStyle} from '../../RequestMoney/Create/ConfirmRequst/confirmMoneyRequestStyle';
import SendDetailsCard from './SendDetailsCard/SendDetailsCard';
import SendRecipent from './SendRecipent/SendRecipent';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {depositStyle} from '../CreateSendMoney/CreateSendMoneyStyle';
import BottomButton from '../../components/BottomButton/BottomButton';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTransactions} from '../../../features/slices/transactions/transactions';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import config from '../../../../config';
import {homeStyle} from '../../Home/home.style';
import {getProfileSummary} from '../../../features/slices/user/getProfile/getProfile';
import Loader from '../../../utils/Loader/Loader';
import { rs } from '../../../utils/styles/responsiveSize';
import { getMyWallets } from '../../../features/slices/myWallets/myWallets';
const ConfirmSendMoney = props => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const {isConnected} = useContext(NetworkContext);
  const [loading, setLoading] = useState(false);
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );

  const styles = confirmMoneyRequestStyle(colors);
  const homeStyles = homeStyle(colors);
  const dispatch = useDispatch();
  const {
    route: {
      params: {
        sendMoney: {
          email,
          totalFees,
          totalAmountDisplay,
          sendAmountDisplay,
          calTotalFees,
          sendAmount,
          currency,
          phone,
          email_or_phone,
          code,
        } = {},
        setSendMoney,
        initialState,
        amount,
        setAmount,
        setError,
        error,
        sendMoney,
        errorText,
        textInput,
        addNote,
        setAddNote
      } = {},
    } = {},
  } = props;

  const confirmSendMoneyData = {
    ...(email && {email: email}),
    ...(phone && code && {phone: '+' + code + phone}),
    ...(email_or_phone &&
      email_or_phone.includes('+') && {phone: email_or_phone}),
    ...(email_or_phone &&
      email_or_phone.includes('@') && {email: email_or_phone}),
    amount: sendAmount,
    total_fees: calTotalFees,
    note: addNote,
    currency_id: currency?.id,
  };

  const handleSendRequest = async () => {
    if (isConnected) {
      setLoading(true);
      const URL = `${config.BASE_URL_VERSION}/send-money/confirm`;
      const res = await postInfo(confirmSendMoneyData, URL, token, 'POST');

      if (res) {
        if (res?.response?.status?.code === 200) {
          const data = {
            email: email || (code && '+' + code + phone) || email_or_phone,
            currency: currency.code,
            amount: amount,
            sendAmountDisplay,
            initialState: initialState,
            setSendMoney: setSendMoney,
            sendMoney: sendMoney,
            setError: setError,
            error: error,
            setAmount: setAmount,
            errorText: errorText,
            textInput,
            setAddNote
          };
          dispatch(getAllTransactions({token}));
          dispatch(getProfileSummary({token}));
          dispatch(getMyWallets({token}));
          props.navigation.navigate(SUCCESS_SEND_MONEY, {data});
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
        style={homeStyles.safeAreaProvider}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={depositStyle(colors).scroll_view}>
          <View style={depositStyle(colors).container}>
            <TransactionStep
              currentPage={trans('2 of 2')}
              header={trans('Confirm & Send')}
              presentStep={2}
              totalStep={2}
              description={trans('Review the information below before confirmation')}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.contentWidth}
                header={trans('Sending Amount')}
                amount={`${sendAmountDisplay} ${currency?.code}`}
              />
            </View>
            <View>
              <SendRecipent
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={{
                  email:
                    email || (code && '+' + code + phone) || email_or_phone,
                }}
              />
            </View>
            <View>
              <SendDetailsCard
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={{
                  sendAmountDisplay,
                  fee: totalFees,
                  currency: currency?.code,
                  totalAmountDisplay,
                }}
              />
            </View>
            <View style={styles.detailsCardCont}>
              <Text style={styles.headerText}>{trans('Note')}</Text>
              <Text style={styles.noteText}>{addNote}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          !loading ? (
            trans('Send Money')
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
        onPress={!loading ? handleSendRequest : null}
      />
    </>
  );
};

export default ConfirmSendMoney;
