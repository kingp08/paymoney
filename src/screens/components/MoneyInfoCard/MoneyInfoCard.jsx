import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {moneyInfoCardStyle} from './moneyInfoCard.style';

const MoneyInfoCard = ({header, amount, name, email, style}) => {
  const {colors} = useTheme();
  const {container, nameText, amountText, headerTextStyle, emailText} =
    moneyInfoCardStyle(colors);
  return (
    <View style={[container, style]}>
      {header && <Text style={headerTextStyle}>{header}</Text>}
      {amount && <Text style={amountText}>{amount}</Text>}

      {name && <Text style={nameText}>{name}</Text>}
      {email && <Text style={emailText}>{email}</Text>}
    </View>
  );
};

export default MoneyInfoCard;
