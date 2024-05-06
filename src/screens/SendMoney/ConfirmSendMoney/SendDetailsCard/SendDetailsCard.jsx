import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../components/CardInfo/CardInfo';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const SendDetailsCard = ({data, style, title}) => {
  const {colors} = useTheme();
  const {sendAmountDisplay, fee, currency,totalAmountDisplay} = data;
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={style.headerText}>{title ? title : trans('Details')}</Text>
      <CardInfo
        title={trans('Amount')}
        text={`${sendAmountDisplay} ${currency}`}
        statusColor={colors.textOctonaryVariant}
      />
      <CardInfo
        title={trans('Fee')}
        text={`${fee}  ${currency}`}
        statusColor={colors.textOctonaryVariant}
      />
      <CardInfo
        title={trans('Total')}
        text={`${totalAmountDisplay}  ${currency}`}
        statusColor={colors.textNonaryVariant}
        last={true}
      />
    </View>
  );
};

export default SendDetailsCard;
