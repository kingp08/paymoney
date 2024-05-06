import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const DetailsCard = ({data, style}) => {
  const {colors} = useTheme();
  const {email, amount, email_or_phone, phone, currency, code} = data;
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo
        title={
          email
            ? trans('Email')
            : email_or_phone
            ? email_or_phone?.includes('@')
              ? trans('Email')
              : trans('Phone')
            : phone
            ? trans('Phone')
            : trans('Email')
        }
        text={email || email_or_phone || '+' + code + phone}
      />
      <CardInfo
        title={trans('Total')}
        text={amount + ' ' + currency?.code}
        statusColor={colors.textNonaryVariant}
        last={true}
      />
    </View>
  );
};

export default DetailsCard;
