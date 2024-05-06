import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {useTranslation} from 'react-i18next';
const RecipientDetails = ({data, style}) => {
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Recipient')}</Text>
      <CardInfo
        title={(data.email && trans('Email')) || (data.phone && trans('Phone'))}
        text={data.email || data.phone}
        last={true}
      />
    </View>
  );
};

export default RecipientDetails;
