import {View, Text} from 'react-native';
import React from 'react';
import {errorMessageStyle} from './errorMessage.style';
import {useTheme} from '@react-navigation/native';

const ErrorMessage = ({message, style, bg}) => {
  const {colors} = useTheme();
  const styles = errorMessageStyle(bg, colors);
  return (
    <View>
      <Text style={[styles.textStyle, style]}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
