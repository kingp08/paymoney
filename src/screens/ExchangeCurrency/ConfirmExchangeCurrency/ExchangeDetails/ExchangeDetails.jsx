import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../components/CardInfo/CardInfo';
import {useTranslation} from 'react-i18next';

const ExchangeDetails = ({
  style,
  data: {
    amount,
    exchangeCurrencyInfo: {toCurrency} = {},
    fromCurrency,
    subTotal,
    toFixed,
    totalAmountDisplay,
    totalFeesDisplay,
  },
}) => {
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo
        title={trans('Currency')}
        text={fromCurrency?.code + ' ' + trans('to') + ' ' + toCurrency?.code}
      />
      <CardInfo
        title={trans('From')}
        text={`${parseFloat(amount).toFixed(toFixed)} ${fromCurrency?.code}`}
      />
      <CardInfo title={trans('To')} text={`${subTotal} ${toCurrency?.code}`} />
      <CardInfo
        title={trans('Fee')}
        text={`${totalFeesDisplay} ${fromCurrency?.code}`}
      />
      <CardInfo
        title={trans('Total')}
        text={`${totalAmountDisplay} ${fromCurrency?.code}`}
        last={true}
      />
    </View>
  );
};

export default ExchangeDetails;
