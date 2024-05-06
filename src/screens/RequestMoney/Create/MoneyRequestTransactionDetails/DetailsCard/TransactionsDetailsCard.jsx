import {View, Text} from 'react-native';
import React from 'react';
import CardInfo from '../../../../components/CardInfo/CardInfo';
import {useTheme} from '@react-navigation/native';
import {dynamicStatusColor} from '../../../../utilities/dynamicStatusColor/dynamicStatusColor';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
const TransactionsDetailsCard = ({style, data}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  return (
    <View style={style.container}>
      <Text style={[style.headerText, style.pb_4]}>{trans('Details')}</Text>
      <CardInfo title={trans('Transaction ID')} copy={true} text={data?.uuid} />
      <CardInfo
        title={trans('Time')}
        text={moment(data?.t_created_at, 'DD/MM/YYYY hh:mm A').format(
          'DD MMM YYYY, hh:mm A',
        )}
      />
      <CardInfo
        title={trans('Status')}
        last={true}
        statusColor={dynamicStatusColor('Pending', colors)}
        text={trans('Pending')}
      />
    </View>
  );
};

export default TransactionsDetailsCard;
