import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../components/CardInfo/CardInfo';
import {useTranslation} from 'react-i18next';

const SendRecipent = ({data, style}) => {
  const {email} = data;
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={style.headerText}>{trans('Recipient')}</Text>
      <CardInfo title={trans('Sending to')} text={email} />
    </View>
  );
};

export default SendRecipent;
