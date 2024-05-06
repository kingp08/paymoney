import {View, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import CardInfo from '../../../components/CardInfo/CardInfo';

const DetailsCard = ({data, style}) => {
  const {t: trans} = useTranslation();
  const {merchantBusinessName, merchantPaymentAmount, currency_code}=data||{};
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo title={trans('Merchant Name')} text={merchantBusinessName} />
      <CardInfo title={trans('Amount')} text={merchantPaymentAmount+" "+currency_code} />
    </View>
  );
};

export default DetailsCard;
