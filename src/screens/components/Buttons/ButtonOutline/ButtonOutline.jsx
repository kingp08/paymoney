import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {buttonOutlineStyle} from './buttonOutlineStyle';
import {useTheme} from '@react-navigation/native';

const ButtonOutline = ({
  icon,
  title,
  onPress,
  disabled,
  bgColor,
  color,
  borderColor,
  style,
}) => {
  const {colors} = useTheme();
  const btnOutlineStyle = buttonOutlineStyle(
    colors,
    bgColor,
    color,
    borderColor,
    disabled,
    icon,
    title,
  );
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={btnOutlineStyle.btnOutlineCont}>
          {typeof icon === 'object' && icon}
          {title && <Text style={btnOutlineStyle.btnOutlineText}>{title}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonOutline;
