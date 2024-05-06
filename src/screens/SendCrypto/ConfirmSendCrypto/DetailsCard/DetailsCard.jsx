import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import CardInfo from '../../../components/CardInfo/CardInfo';

const DetailsCard = ({data, style}) => {
  const {colors} = useTheme();
  const {recipientAddress, floatAmount, fee, code, decimalFormatAmountCrypto} =
    data;
  const {t: trans} = useTranslation();
  const totalAmount = (parseFloat(floatAmount) + parseFloat(fee))?.toFixed(
    decimalFormatAmountCrypto,
  );
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo title={trans('Recipient Address')} text={recipientAddress} />
      <CardInfo
        title={trans('Amount')}
        text={floatAmount + ' ' + code}
        statusColor={colors.textNonaryVariant}
      />
      <CardInfo
        title={trans('Network Fee')}
        text={fee + ' ' + code}
        statusColor={colors.textNonaryVariant}
      />
      <CardInfo
        title={trans('Total')}
        text={totalAmount + ' ' + code}
        statusColor={colors.textNonaryVariant}
        last={true}
      />
    </View>
  );
};

export default DetailsCard;
