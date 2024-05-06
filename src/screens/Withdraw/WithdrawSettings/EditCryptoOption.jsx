import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import CustomInput from '../../components/CustomInput/CustomInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {useTranslation} from 'react-i18next';
import { memo } from 'react';
const EditCryptoOption = ({
  withdrawOptionCrypto,
  setWithdrawOptionCrypto,
  handleChange,
  error,
  cryptoError,
  item,
}) => {
  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const {t:trans} = useTranslation();
  useEffect(() => {
    setWithdrawOptionCrypto({
      ...withdrawOptionCrypto,
      id: item.id,
      crypto_address: item?.crypto_address,
      code: item?.currency?.code,
      currency_id: item?.currency?.id,
    });
  }, []);
  return (
    <View>
      <View style={createWithdrawstyle.currencyContainer}>
        <Text style={depositStyle(colors).inputTitle}>{trans('Currency')}</Text>
        <SelectInput
          style={createWithdrawstyle.transactionStepContainer}
          title={item?.currency?.code}
          isError={error.currency}
          error={'This field is required.'}
          icon={<RightIcon fill={colors.manatee} />}
        />
      </View>
      <View>
        <Text style={depositStyle(colors).inputTitle}>{'Crypto Address'}</Text>
        <View>
          <CustomInput
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionCrypto.crypto_address}
            isError={error.crypto_address}
            error={
              cryptoError
                ? 'This address is not Valid'
                : 'This field is required.'
            }
            onChangeText={value => handleChange(value, 'crypto_address')}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(EditCryptoOption);
