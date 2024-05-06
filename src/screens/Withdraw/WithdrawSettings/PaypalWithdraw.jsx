import {View, Text} from 'react-native';
import React from 'react';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import {useTheme} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import {useTranslation} from 'react-i18next';

const PaypalWithdraw = ({
  withdrawOptionPaypal,
  handleChange,
  error,
  validEmail,
}) => {
  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View>
      <Text style={depositStyle(colors).inputTitle}>{trans('Email')}</Text>
      <View>
        <CustomInput
          style={createWithdrawstyle.transactionStepContainer}
          keyboardAppearance={'dark'}
          value={withdrawOptionPaypal.email}
          keyboardType={'email-address'}
          inputMode={'email'}
          autoCapitalize={'none'}
          isError={error.email}
          error={
            !validEmail
              ? trans('Your email is not valid.')
              : trans('This field is required.')
          }
          onChangeText={value => handleChange(value, 'email')}
        />
      </View>
    </View>
  );
};

export default PaypalWithdraw;
