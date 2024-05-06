import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {customButtonStyle} from './customButtonStyle';

const CustomButton = ({
  icon,
  title,
  onPress,
  disabled = false,
  bgColor,
  color,
  style,
}) => {
  const {colors} = useTheme();
  const btnStyle = customButtonStyle(
    colors,
    bgColor,
    color,
    disabled,
    icon,
    title,
  );

  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={btnStyle.btnCont}>
          {icon}
          {typeof title === 'string' ? (
            <Text style={btnStyle.btnText}>{title}</Text>
          ) : (
            title
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
