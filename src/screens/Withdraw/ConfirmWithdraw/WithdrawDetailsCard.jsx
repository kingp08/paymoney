import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../components/CardInfo/CardInfo';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';

const WithdrawDetailsCard = ({data, style, title}) => {
  const {colors} = useTheme();
  const {via, accountHolName, accountNumber, swiftCode, BankName} = data;
  const {t:trans} = useTranslation();
  const {payment_method_withdraw} = useSelector(
    state => state.getAddWithdrawalMethods,
  );
  return (
    <View style={style.container}>
      <Text style={style.headerText}>{title ? trans(title) : trans('Details')}</Text>
      <CardInfo
        title={trans('Via')}
        text={via?.toString() === payment_method_withdraw?.Paypal?.toString() ? 'Paypal' :via?.toString() === payment_method_withdraw?.Bank?.toString() ? 'Bank' : 'Crypto'}
        statusColor={colors.textOctonaryVariant}
        last={via?.toString() !== payment_method_withdraw?.Bank?.toString() ? true : false}
      />
      {accountHolName && accountNumber && swiftCode && BankName && (
        <View>
          <CardInfo
            title={trans('Account Holder’s Name')}
            text={accountHolName}
            statusColor={colors.textOctonaryVariant}
          />
          <CardInfo
            title={trans('Account Number') + '/' + trans('IBAN')}
            text={accountNumber}
            statusColor={colors.textOctonaryVariant}
          />
          <CardInfo
            title={trans('SWIFT Code')}
            text={swiftCode}
            statusColor={colors.textOctonaryVariant}
          />
          <CardInfo
            title={trans('Bank Name')}
            text={BankName}
            statusColor={colors.textOctonaryVariant}
            last={true}
          />
        </View>
      )}
    </View>
  );
};

export default WithdrawDetailsCard;
