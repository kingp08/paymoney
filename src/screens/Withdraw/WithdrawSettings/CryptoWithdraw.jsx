import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';

import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import CustomInput from '../../components/CustomInput/CustomInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import {useTranslation} from 'react-i18next';
import { memo } from 'react';
const CryptoWithdraw = ({
  withdrawOptionCrypto,
  handleChange,
  error,
  cryptoError,
  handleCurrencyIndex,
}) => {
  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const {t:trans} = useTranslation();

  return (
    <View>
      <View style={createWithdrawstyle.currencyContainer}>
        <Text style={depositStyle(colors).inputTitle}>{trans('Currency')}</Text>
        <SelectInput
          style={createWithdrawstyle.transactionStepContainer}
          title={withdrawOptionCrypto?.code}
          onPress={handleCurrencyIndex}
          isError={error.code && !withdrawOptionCrypto?.code}
          error={trans('This field is required.')}
          icon={<RightIcon fill={colors.manatee} />}
        />
      </View>
      <View>
        <Text style={depositStyle(colors).inputTitle}>
          {trans('Crypto Address')}
        </Text>
        <View>
          <CustomInput
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionCrypto.crypto_address}
            isError={error.crypto_address}
            error={
              cryptoError
                ? trans('This address is not Valid')
                : trans('This field is required.')
            }
            onChangeText={value => handleChange(value, 'crypto_address')}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(CryptoWithdraw);
