import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { depositUsingStripeDetailsStyle } from '../ConfirmDeposit/Stripe/Details/depositUsingStripeDetails.style';
import { rs } from '../../../utils/styles/responsiveSize';
import CardInfo from '../../components/CardInfo/CardInfo';


const ConfirmDepositDetails = ({data}) => {
  const {colors} = useTheme();
  const styles = depositUsingStripeDetailsStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View style={styles.cardCont}>
      <Text style={styles.header}>{trans('Through')}</Text>
      <View style={styles.stripeIcon}>
        {data?.payment_method?.name && <Text style={styles.paypalText}>{data?.payment_method?.name}</Text>}
      </View>
      <CardInfo
        title={trans('Amount')}
        horizontalGap={rs(80)}
        text={`${data.formatted_amount} ${data?.currency?.code}`}
      />
      <CardInfo
        title={trans('Fee')}
        horizontalGap={rs(80)}
        text={`${data.formatted_totalFees} ${data?.currency?.code}`}
      />
      <CardInfo
        title={trans('Total')}
        horizontalGap={rs(80)}
        last={true}
        statusColor={colors.textNonaryVariant}
        text={`${data.formatted_totalAmount} ${data?.currency?.code}`}
      />
    </View>
  );
};

export default ConfirmDepositDetails;
