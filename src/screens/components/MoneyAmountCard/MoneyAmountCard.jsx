import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {moneyAmountCardStyle} from './moneyAmountCard.style';

const MoneyAmountCard = ({header, amount, style}) => {
  const {colors} = useTheme();
  const {container, headerText, amountText} = moneyAmountCardStyle(colors);
  return (
    <View style={[container, style]}>
      <Text style={headerText}>{header}</Text>
      <Text style={amountText}>{amount}</Text>
    </View>
  );
};

export default MoneyAmountCard;
