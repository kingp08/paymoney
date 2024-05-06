import {View, Text} from 'react-native';
import React from 'react';
import {depositUsingStripeDetailsStyle} from '../../../Stripe/Details/depositUsingStripeDetails.style';
import {useTheme} from '@react-navigation/native';
import CardInfo from '../../../../../components/CardInfo/CardInfo';
import {rs} from '../../../../../../utils/styles/responsiveSize';
import {useTranslation} from 'react-i18next';

const BankInfoDetails = ({data: {paymentInfo, bankInfo}, style}) => {
  const {colors} = useTheme();
  const styles = depositUsingStripeDetailsStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View style={[styles.cardCont, style?.container]}>
      <Text style={style?.header}>{trans('Details')}</Text>

      <CardInfo
        title={trans('Via')}
        horizontalGap={rs(80)}
        text={paymentInfo?.payment_method?.name}
      />
      <CardInfo
        title={trans("Account Holder’s Name")}
        horizontalGap={rs(80)}
        text={bankInfo?.accountName}
      />
      <CardInfo
        title={trans('Account Number/IBAN')}
        horizontalGap={rs(80)}
        text={bankInfo?.accountNumber}
      />
      <CardInfo
        title={trans('Bank Name')}
        horizontalGap={rs(80)}
        last={true}
        text={bankInfo?.bankName}
      />
    </View>
  );
};

export default BankInfoDetails;
