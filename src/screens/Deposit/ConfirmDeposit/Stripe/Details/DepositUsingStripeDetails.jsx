import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {rs} from '../../../../../utils/styles/responsiveSize';
import StripeIcon from '../../../../../assets/svg/stripeIcon.svg';
import PaypalIcon from '../../../../../assets/svg/paypal-deposit.svg';
import PaypalDark from '../../../../../assets/svg/paypal-dark.svg';
import {depositUsingStripeDetailsStyle} from './depositUsingStripeDetails.style';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';

const DepositUsingStripeDetails = ({data, via}) => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const styles = depositUsingStripeDetailsStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View style={styles.cardCont}>
      <Text style={styles.header}>{trans('Through')}</Text>
      <View style={styles.stripeIcon}>
        {via ? theme === 'dark'?<PaypalDark/>: <PaypalIcon/> : <StripeIcon />}
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

export default DepositUsingStripeDetails;
