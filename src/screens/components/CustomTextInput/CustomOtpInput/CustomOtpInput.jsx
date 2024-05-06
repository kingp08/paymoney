import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {customOtpInputStyle} from './customOtpInputStyle';
import {useTheme} from '@react-navigation/native';

const CustomOtpInput = ({
  style = {},
  keyboardAppearance = 'light',
  returnKeyType = 'done',
  caretHidden = true,
  Ref,
  value = '',
  isError = false,
  onChange,
  onChangeText,
  onKeyPress,
  autoFocus,
  bgColor,
}) => {
  const {colors} = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const otpInputStyle = customOtpInputStyle(
    colors,
    isFocus,
    isError,
    value,
    bgColor,
  );
  return (
    <View style={{...otpInputStyle.inputCont, ...style}}>
      <TextInput
        style={{
          ...otpInputStyle.input,
        }}
        caretHidden={caretHidden}
        cursorColor={colors.textSecondary}
        keyboardAppearance={keyboardAppearance}
        keyboardType={'number-pad'}
        returnKeyType={returnKeyType}
        maxLength={1}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={Ref}
        value={value}
        onChange={onChange}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default CustomOtpInput;
