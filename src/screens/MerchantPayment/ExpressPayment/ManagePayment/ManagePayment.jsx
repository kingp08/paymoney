import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {requestReviewStyle} from '../../../RequestMoney/Accept/ReviewRequest/RequestReviewStyle';
import {useTheme} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import CustomInput from '../../../components/CustomInput/CustomInput';
import {debounceValidation} from '../../../utilities/Validation/Validation';
import {useSelector} from 'react-redux';
import {CONFIRM_EXPRESS_MERCHANT, HOME} from '../../../../navigation/routeName/routeName';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {useEffect} from 'react';
import Loader from '../../../../utils/Loader/Loader';
import config from '../../../../../config';
import { postInfo } from '../../../../features/auth/login/loginApi';
import { handleToaster } from '../../../../utils/CustomAlert/handleAlert';

const ManagePayment = ({
  route: {
    params: {data},
  },
  navigation,
}) => {
  useEffect(() => {
    if (Object.keys(data)?.length === 0 || !data) {
      navigation.navigate(HOME);
    }
  }, [data]);
  const {user: {token} = {}} = useSelector(state => state.loginUserReducer) || {};
  const {merchantDefaultCurrencyCode = '', merchantId} = data;
  const {colors} = useTheme();
  let count = useRef(8);
  const {isConnected} = useContext(NetworkContext);
  const [amount, setAmount] = useState('');
  const styles = requestReviewStyle(colors);
  const {t: trans} = useTranslation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {preference} = useSelector(state => state.preference);
  const {decimal_format_amount} = preference || {};
  const handleProceed = async () => {
    if(amount>0 || amount && merchantDefaultCurrencyCode){
      setLoading(true);
      const URL =`${config.BASE_URL_VERSION}/qr-code/standard-merchant-payment-review`;
    const obj = {
      merchant_id:merchantId, amount, currency_code:merchantDefaultCurrencyCode
    };
    const res = await postInfo(obj, URL, token, 'POST');
    if(res){
      setLoading(false);
      const {status, records}=res?.response;
      if(status?.code===200){
       return navigation.navigate(CONFIRM_EXPRESS_MERCHANT, {data:records, currency:merchantDefaultCurrencyCode, merchant_id:merchantId,})
      }else{
        handleToaster(trans(status?.message), 'error', colors)
      }
    }
    }else{
      setError(true)
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TransactionStep
              currentPage={trans('{{x}} of {{y}}', {
                x: 1,
                y: 2,
              })}
              header={trans('Manage Payment')}
              presentStep={1}
              totalStep={2}
              description={trans('You can change the amount of money before proceed payment')}
            />
            <View style={styles.email}>
              <CustomInput
                label={trans('Amount') + '*'}
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                isError={error && !amount || !(amount > 0) && amount}
                style={styles.width_80}
                value={amount}
                returnKeyType={'done'}
                onChangeText={text => {
                  setAmount(
                    debounceValidation(
                      text,
                      8,
                      decimal_format_amount || 2,
                      count,
                    ),
                  );
                }}
                maxLength={Number(count.current)}
                error={
                  !(amount > 0) && amount 
                    ? trans('Please enter a valid number.')
                    : error && !amount
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <View style={styles.mb_16}>
              <CustomInput
                label={trans('Currency') + '*'}
                value={merchantDefaultCurrencyCode}
                style={styles.width_80}
                returnKeyType={'done'}
                editable={false}
              />
            </View>
            <CustomButton
              title={loading?<Loader source={require('../../../../assets/lottie/loader.json')} color={colors.white} />:trans('Proceed')}
              disabled={loading ? true : false}
              onPress={!isConnected ? null : handleProceed}
              bgColor={colors.cornflowerBlue}
              style={[styles.width_80, styles.mb_28]}
              color={colors.white}
            />
            <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
              <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ManagePayment;
