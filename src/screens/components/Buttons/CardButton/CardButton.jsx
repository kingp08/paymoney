import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {cardButtonStyle} from './cardButtonStyle';

const CardButton = ({onPress, disabled, title, rightIcon, textColor}) => {
  const {colors} = useTheme();
  const opnSheetBtnStyle = cardButtonStyle(colors, textColor);
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        <View style={opnSheetBtnStyle.cartBtnCont}>
          <Text style={opnSheetBtnStyle.title}>{title}</Text>
          {rightIcon}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CardButton;
