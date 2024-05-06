import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import {CREATE_SEND_MONEY, HOME} from '../../../navigation/routeName/routeName';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {successSendMoneyStyle} from './SuccessSendMoney.style';
import {useDispatch, useSelector} from 'react-redux';
import {sendMoneyCurrencies} from '../../../features/slices/getCurrencies/getSendMoneyCurrencies';
import {useTranslation} from 'react-i18next';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import config from '../../../../config';
import Lottie from 'lottie-react-native';
import {useRef} from 'react';
import {successMoneyRequestStyle} from '../../RequestMoney/Create/SucessRequest/successMoneyRequest.style';

const SucessSendMoney = props => {
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const ref = useRef();
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const successSendStyle = successSendMoneyStyle(colors);
  const SuccessMoneyReqstyles = successMoneyRequestStyle(colors);
  const dispatch = useDispatch();
  const {
    route: {
      params: {
        data: {
          email,
          sendAmountDisplay,
          currency,
          setSendMoney,
          initialState,
          setError,
          setAmount,
          errorText,
          textInput,
          setAddNote
        } = {},
      } = {},
    } = {},
    navigation,
  } = props;

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

  const handleSendAgian = () => {
    if (isConnected) {
      if (textInput?.current?.clear) {
        textInput.current.clear();
      }
      setError(errorText);
      setAmount('');
      setSendMoney(initialState);
      setAddNote('');
      const URL = `${config.BASE_URL_VERSION}/send-money/get-currencies`;
      dispatch(sendMoneyCurrencies({token, URL}));
      props.navigation.navigate(CREATE_SEND_MONEY);
      controlBackHandler?.remove();
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={successSendStyle.container}>
        <View style={SuccessMoneyReqstyles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={successSendStyle.success}>{`${trans('Success')}!`}</Text>
        <Text style={successSendStyle.description}>
          {trans('You have successfully sent')}{' '}
          <Text
            style={{
              ...successSendStyle.backHomeBtn,
              color: colors.textPrimaryVariant,
            }}>
            {sendAmountDisplay} {`${currency} ${trans('to')} `}
          </Text>
          ({email})
        </Text>
        <CustomButton
          title={trans('Send Again')}
          onPress={handleSendAgian}
          bgColor={colors.cornflowerBlue}
          style={successSendStyle.sendAgainBtn}
          color={colors.white}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(HOME);
            controlBackHandler?.remove();
          }}>
          <Text style={successSendStyle.backHomeBtn}>{trans('Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SucessSendMoney;
