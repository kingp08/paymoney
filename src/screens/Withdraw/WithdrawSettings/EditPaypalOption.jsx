import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import CustomInput from '../../components/CustomInput/CustomInput';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { memo } from 'react';

const EditPaypalOption = ({
  withdrawOptionPaypal,
  setWithdrawOptionPaypal,
  handleChange,
  error,
  validEmail,
  item,
}) => {
  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const {t:trans} = useTranslation();
  useEffect(() => {
    setWithdrawOptionPaypal({
      ...withdrawOptionPaypal,
      id: item.id,
      email: item.email,
    });
  }, []);
  return (
    <View>
      <Text style={depositStyle(colors).inputTitle}>{trans('Email')}</Text>
      <View>
        <CustomInput
          style={createWithdrawstyle.transactionStepContainer}
          keyboardAppearance={'dark'}
          value={withdrawOptionPaypal.email}
          isError={error.email}
          keyboardType={'email-address'}
          inputMode={'email'}
          autoCapitalize={'none'}
          error={
            !validEmail && withdrawOptionPaypal.email
              ? trans('The email is invalid.')
              : trans('This field is required.')
          }
          onChangeText={value => handleChange(value, 'email')}
        />
      </View>
    </View>
  );
};

export default memo(EditPaypalOption);
