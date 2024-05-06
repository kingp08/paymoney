import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import {depositSuccessStyle} from '../../Deposit/DepositSuccess/DepositSuccess';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {CREATE_WITHDRAW, HOME} from '../../../navigation/routeName/routeName';
import {successSendMoneyStyle} from '../../SendMoney/SucessSendMoney/SuccessSendMoney.style';
import {useTranslation} from 'react-i18next';
import {getAllWithdrawSettingsLists} from '../../../features/slices/WithdrawLists/getWithdrawSettingsLists';
import {useDispatch, useSelector} from 'react-redux';
import config from '../../../../config';
import {successMoneyRequestStyle} from '../../RequestMoney/Create/SucessRequest/successMoneyRequest.style';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';

const SuccessWithdraw = props => {
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {payment_method_withdraw} = useSelector(
    state => state.getAddWithdrawalMethods,
  );
  const ref = useRef();
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const {
    route: {
      params: {
        withdrawInfo,
        setWithdrawInfo,
        initialState,
        selectedCurrency,
        selectedMethod,
        setAmount,
      } = {},
    } = {},
    navigation,
  } = props;
  const {colors} = useTheme();
  const styles = depositSuccessStyle(colors);
  const successSendStyle = successSendMoneyStyle(colors);
  const SuccessMoneyReqstyles = successMoneyRequestStyle(colors);
  let controlBackHandler;
  useEffect(() => {
    controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }, []);
  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);

  const withdrawAgain = () => {
    const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
    setAmount('');
    setWithdrawInfo(initialState);
    dispatch(getAllWithdrawSettingsLists({token, URL}));
    navigation.navigate(CREATE_WITHDRAW);
    controlBackHandler.remove();
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={depositSuccessStyle(colors).container}>
        <View style={SuccessMoneyReqstyles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={depositSuccessStyle(colors).success}>{trans('Success!')}</Text>
        <Text style={depositSuccessStyle(colors).description}>
          {trans('You have successfully withdrawn')}{' '}
          <Text
            style={{
              ...depositSuccessStyle(colors).backHomeBtn,
              color: colors.textPrimaryVariant,
            }}>
            {`${withdrawInfo.display_amount}`} {`${selectedCurrency.code}`}
            {''} {trans('through the')}{' '}
            {`${selectedMethod?.payment_method?.toString()}` === payment_method_withdraw?.Paypal?.toString() && 'Paypal'}
            {`${selectedMethod?.payment_method?.toString()}` === payment_method_withdraw?.Bank?.toString() && 'Bank'}
            {`${selectedMethod?.payment_method?.toString()}` === payment_method_withdraw?.Crypto?.toString() && 'Crypto'}
          </Text>
        </Text>
        <CustomButton
          title={trans('Withdraw Again')}
          onPress={withdrawAgain}
          bgColor={colors.cornflowerBlue}
          style={successSendStyle.sendAgainBtn}
          color={colors.white}
        />

        <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
          <Text style={styles.backHomeBtn}>{trans('Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SuccessWithdraw;
