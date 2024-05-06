import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AmountDetails = ({data, style}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo title={trans('Amount')} text={data?.amount} />
      <CardInfo title={trans('Fee')} text={data?.fees} />
      <CardInfo
        title={trans('Total')}
        statusColor={colors.textNonaryVariant}
        text={data?.totalAmount}
        last={true}
      />
    </View>
  );
};

export default AmountDetails;
