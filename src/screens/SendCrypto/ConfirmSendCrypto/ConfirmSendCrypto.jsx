import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {confirmMoneyRequestStyle} from '../../RequestMoney/Create/ConfirmRequst/confirmMoneyRequestStyle';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import MoneyAmountCard from '../../components/MoneyAmountCard/MoneyAmountCard';
import BottomButton from '../../components/BottomButton/BottomButton';
import DetailsCard from './DetailsCard/DetailsCard';
import {SUCCESS_SEND_CRYPTO} from '../../../navigation/routeName/routeName';
import Loader from '../../../utils/Loader/Loader';
import config from '../../../../config';
import { postInfo } from '../../../features/auth/login/loginApi';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import { getAllTransactions } from '../../../features/slices/transactions/transactions';
import { getProfileSummary } from '../../../features/slices/user/getProfile/getProfile';
import { getMyWallets } from '../../../features/slices/myWallets/myWallets';
import { rs } from '../../../utils/styles/responsiveSize';
import { priorityFormat } from '../CreateSendCrypto/CreateSendCrypto';
const ConfirmSendCrypto = ({
  route: {params: {data = {}} = {}} = {},
  navigation,
}) => {
  const {colors} = useTheme();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {
    amount,networkFee, setFormData, initialState,setAmount, provider,
    formData: {code, recipientAddress, priority, senderAddress} = {},
  } = data;
  const {isConnected} = useContext(NetworkContext);
  const decimalFormatAmountCrypto = useSelector(
    state => state.preference?.decimal_format_amount_crypto || 8,
  );
  const [loading, setLoading] = useState(false);
  const {t: trans} = useTranslation();
  const floatAmount = parseFloat(amount).toFixed(decimalFormatAmountCrypto);
  const styles = useMemo(() => confirmMoneyRequestStyle(colors), []);
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    if(loading || !isConnected) return;
    setLoading(true);
    let URL = "";
    if(provider == 'tatumio') {
      URL=`${config.BASE_URL_VERSION}/crypto/send/tatumio/confirm`;
    } else {
      URL=`${config.BASE_URL_VERSION}/crypto/send/blockio/confirm`;
    }
    const obj={
      receiverAddress:recipientAddress,
      senderAddress,
      priority: provider == 'tatumio' ? priorityFormat(priority) : priority?.toLowerCase(),
      amount,
      walletCurrencyCode: code,
    }
    const result= await postInfo(obj,URL, token, 'POST');
    if(result){
      setLoading(false);
      const {status}=result?.response ||{};
      if (status?.code===200){
        navigation.navigate(SUCCESS_SEND_CRYPTO, {
          data: {
            floatAmount,
            code,
            recipientAddress,
          },
        });
        setFormData(initialState);
        setAmount('')
        dispatch(getAllTransactions({token}));
        dispatch(getProfileSummary({token}));
        dispatch(getMyWallets({token}));
      }else{
        handleToaster(trans(status?.message), 'error', colors);
      }
    }
  };
  const [isFastLoad, setIsFastLoad] = useState(true);
  useEffect(() => {
    const fastLoadTimeout = setTimeout(() => {
      setIsFastLoad(false);
    }, 0);
    return () => {
      clearTimeout(fastLoadTimeout);
    };
  }, []);
  if (isFastLoad) {
    return <View style={styles.scroll_view} />;
  }
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
              header={trans('Confirm Send')}
              presentStep={2}
              totalStep={2}
              description={trans('Review the information below before confirmation')}
            />
            <View style={styles.moneyCard}>
              <MoneyAmountCard
                style={styles.contentWidth}
                header={trans('Sending Amount')}
                amount={floatAmount + ' ' + code}
              />
            </View>
            <View>
              <DetailsCard
                style={{
                  container: styles.detailsCardCont,
                  headerText: styles.headerText,
                }}
                data={{
                  recipientAddress,
                  floatAmount,
                  fee: parseFloat(networkFee)?.toFixed(decimalFormatAmountCrypto),
                  code,
                  decimalFormatAmountCrypto,
                }}
              />
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
                source={require('../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
            </View>
          ) : (
          trans('Send Crypto')
          )
        }
        onPress={handleConfirm}
      />
    </>
  );
};

export default ConfirmSendCrypto;
