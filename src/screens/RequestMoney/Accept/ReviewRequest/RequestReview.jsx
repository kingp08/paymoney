import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  HOME,
  SEND_REQUESTED_MONEY,
} from '../../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import {requestReviewStyle} from './RequestReviewStyle';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {debounceValidation} from '../../../utilities/Validation/Validation';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getAllPreference} from '../../../../features/slices/preferenceSlice/preferenceSlice';
import config from '../../../../../config';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import ErrorMessage from '../../../utilities/ErrorMessage/ErrorMessage';
const initialState = {
  totalFee: '',
  totalAmount: '',
};
const RequestReview = ({
  route: {
    params: {data, id},
  },
  navigation,
}) => {
  const {colors} = useTheme();
  let count = useRef(8);
  const {user: {token, user_id} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {preference} = useSelector(state => state.preference);
  const [error, setError] = useState({
    amount: '',
  });
  const {
    displayAmount,
    currency,
    currencyType,
    currency_id,
    email,
    phone,
    note,
  } = data;
  const {decimal_format_amount, decimal_format_amount_crypto} =
    preference || {};
  const {isConnected} = useContext(NetworkContext);
  const [amount, setAmount] = useState(displayAmount);
  const [acceptRequestInfo, setAcceptRequestInfo] = useState(initialState);
  const [amountLimit, setAmountLimit] = useState(null);
  const [amountCharge, setAmountCharge] = useState(null);
  const [limitCheckLoading, setLimitCheckLoading] = useState(false);
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const styles = requestReviewStyle(colors);
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPreference({token}));
  }, [dispatch]);
  const checkLimit = async amount1 => {
    if (amount1 > 0 && isConnected) {
      setLimitCheckLoading(true);
      const URL = `${config.BASE_URL_VERSION}/accept-money/amount-limit-check`;
      const obj = {
        amount: amount1,
        user_id: user_id,
        currency_id: currency_id,
      };
      const res = await postInfo(obj, URL, token, 'POST');
      if (res) {
        setLimitCheckLoading(false);
        const {
          records: {
            formattedFeesFixed,
            formattedFeesPercentage,
            formattedTotalFees,
            formattedTotalAmount,
            currencyCode,
          } = {},
          status: {code, message},
        } = res?.response;
        let fee;
        switch (code) {
          case 400:
            return (
              setCheckAuth(true),
              setCheckValidity(false),
              setAmountLimit(''),
              setAmountCharge('')
            );
          case 403:
            return (
              setCheckValidity(true),
              setCheckAuth(false),
              setAmountLimit(''),
              setAmountCharge('')
            );
          case 200:
            return (
              setCheckAuth(true),
              setCheckValidity(true),
              setAmountLimit(''),
              (fee = `${formattedTotalFees} ${currencyCode} (${formattedFeesPercentage} + ${formattedFeesFixed})`),
              setAmountCharge(`*${trans('Fee')}: ${fee}`),
              setAcceptRequestInfo({
                ...acceptRequestInfo,
                totalFee: `${fee}`,
                totalAmount: formattedTotalAmount,
              })
            );
          default:
            return (
              setCheckAuth(true),
              setCheckValidity(true),
              message.includes('Maximum') || message.includes('Minimum')
                ? setAmountLimit(
                    `${
                      trans(message.substring(0, message.lastIndexOf(' '))) +
                      ' ' +
                      message.split(' ').pop()
                    }`,
                  )
                : setAmountLimit(trans(message))
            );
        }
      }
    }
  };
  const handleSubmit = () => {
    if (amount > 0 && !amountLimit && !limitCheckLoading && isConnected) {
      navigation.navigate(SEND_REQUESTED_MONEY, {
        data: {
          email: email,
          currency: currency,
          note: note,
          currency_id: currency_id,
          phone: phone,
          amount: amount,
          fee: acceptRequestInfo.totalFee,
          totalAmount: acceptRequestInfo.totalAmount,
          id: id,
          currencyType,
        },
      });
    } else {
      setError({...error, amount: true});
    }
  };
  useEffect(() => {
    let timeoutId;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkLimit(amount);
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [amount]);
  const [fastLoad, setFastLoad] = useState(true);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View style={styles.scroll_view} />;
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
              header={trans('Manage Request')}
              presentStep={1}
              totalStep={2}
              description={trans('You can change the amount of money requested before sending')}
            />
            <View style={styles.email}>
              <CustomInput
                label={trans('Amount') + '*'}
                keyboardAppearance={'dark'}
                keyboardType={'number-pad'}
                isError={
                  (error.amount && !amount) ||
                  (!(amount > 0) && amount) ||
                  amountLimit
                }
                style={styles.width_80}
                value={amount}
                returnKeyType={'done'}
                onChangeText={text => {
                  setLimitCheckLoading(true);
                  setAmount(
                    debounceValidation(
                      text,
                      8,
                      currencyType == 'crypto'
                        ? decimal_format_amount_crypto
                        : decimal_format_amount,
                      count,
                    ),
                  );
                }}
                maxLength={Number(count.current)}
                error={
                  !(amount > 0) && amount
                    ? trans('Please enter a valid number.')
                    : amountLimit
                    ? amountLimit
                    : error.amount
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <View style={styles.mb_16}>
              <CustomInput
                label={trans('Currency') + '*'}
                keyboardAppearance={'dark'}
                value={currency}
                style={styles.width_80}
                returnKeyType={'done'}
                editable={false}
                info={amountCharge && !amountLimit ? amountCharge : ''}
              />
            </View>
            <View style={styles.mb_16}>
              <CustomInput
                label={
                  email
                    ? trans('Email') + '*'
                    : phone
                    ? trans('Phone') + '*'
                    : trans('Email') + '*'
                }
                keyboardAppearance={'dark'}
                value={email || phone}
                style={styles.width_80}
                returnKeyType={'done'}
                editable={false}
              />
            </View>
            <View style={styles.mb_20}>
              <CustomInput
                label={trans('Add Note') + '*'}
                multiline={true}
                numberOfLines={5}
                editable={false}
                style={styles.height_100}
                value={note}
                textAlignVertical={'top'}
                returnKeyType={'done'}
              />
            </View>
            <CustomButton
              title={trans('Proceed')}
              disabled={limitCheckLoading && amount > 0 ? true : false}
              onPress={
                !(isConnected && amount > 0 && checkAuth && checkValidity) ||
                limitCheckLoading
                  ? null
                  : handleSubmit
              }
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
      {!checkAuth && isConnected && (
        <ErrorMessage
          message={trans('You are not permitted for this transaction!')}
        />
      )}
      {!checkValidity && isConnected && checkAuth && (
        <ErrorMessage message={trans('Your account has been suspended!')} />
      )}
    </KeyboardAvoidingView>
  );
};

export default RequestReview;
