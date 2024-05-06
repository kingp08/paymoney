import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {depositUsingStripeDetailsStyle} from '../../Stripe/Details/depositUsingStripeDetails.style';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {rs} from '../../../../../utils/styles/responsiveSize';
import {useTranslation} from 'react-i18next';

const DepositUsingBankDetails = ({data, style}) => {
  const {colors} = useTheme();
  const styles = depositUsingStripeDetailsStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View style={[styles.cardCont, style?.container]}>
      <Text style={style?.header}>{trans('Depositing')}</Text>

      <CardInfo
        title={trans('Amount')}
        horizontalGap={rs(80)}
        text={`${data.formatted_amount} ${data.currency.code}`}
      />
      <CardInfo
        title={trans('Fee')}
        horizontalGap={rs(80)}
        text={`${data.formatted_totalFees} ${data.currency.code}`}
      />
      <CardInfo
        title={trans('Total')}
        horizontalGap={rs(80)}
        last={true}
        statusColor={colors.textNonaryVariant}
        text={`${data.formatted_totalAmount} ${data.currency.code}`}
      />
    </View>
  );
};

export default DepositUsingBankDetails;
