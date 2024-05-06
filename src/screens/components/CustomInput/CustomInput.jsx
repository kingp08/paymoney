import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {customInputStyle} from './customInputStyle';
import {useTheme} from '@react-navigation/native';
import {rs} from '../../../utils/styles/responsiveSize';
import Stepper from '../Stepper/Stepper';

const CustomInput = ({
  label = '',
  style = {},
  editable = true,
  keyboardAppearance = 'light',
  keyboardType = 'default',
  returnKeyType = '',
  placeholder = '',
  defaultValue = '',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'center',
  maxLength = 10000,
  secureTextEntry = false,
  value,
  leftIcon,
  rightIcon,
  isPasswordStep = false,
  presentStep,
  totalStep,
  isError = false,
  error = '',
  isConvertible = false,
  onChangeText,
  onChange,
  onKeyPress,
  autoFocus,
  onEndEditing,
  bgColor,
  info = '',
  Ref,
  inputMode = 'text',
  autoCapitalize = 'sentences',
}) => {
  const {colors} = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [layout, setLayout] = useState(null);
  const [stepLayout, setStepLayout] = useState(null);

  let inputWidth;
  if (typeof leftIcon === 'object' && typeof rightIcon === 'object') {
    inputWidth = layout?.width - rs(14 * 6 + 3) || undefined;
  } else if (typeof leftIcon === 'object') {
    inputWidth = layout?.width - rs(14 * 4 + 3) || undefined;
  } else if (typeof rightIcon === 'object') {
    inputWidth = layout?.width - rs(14 * 4 - 1) || undefined;
  } else if (
    typeof leftIcon === 'undefined' &&
    typeof rightIcon === 'undefined'
  ) {
    inputWidth = layout?.width - rs(14 * 2) || undefined;
  }

  const inputStyle = customInputStyle(
    colors,
    isFocus,
    value,
    isError,
    layout,
    editable,
    isConvertible,
    bgColor,
    inputWidth,
  );
  return (
    <View>
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <View
        onLayout={event => setLayout(event.nativeEvent.layout)}
        style={{
          ...inputStyle.inputCont,
          ...style,
        }}>
        {typeof leftIcon === 'object' && (
          <View style={inputStyle.icon}>{leftIcon}</View>
        )}
        <TextInput
          style={{
            ...inputStyle.input,
            ...inputStyle.inputWidth,
          }}
          cursorColor={colors.textSecondary}
          placeholderTextColor={
            label ? colors.manatee : colors.textQuaternaryVariant
          }
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          placeholder={isFocus ? '' : placeholder}
          editable={editable}
          keyboardAppearance={keyboardAppearance}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={textAlignVertical}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          defaultValue={defaultValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value?.toString()}
          onChangeText={onChangeText}
          onChange={onChange}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          onEndEditing={onEndEditing}
          ref={Ref}
        />
        {typeof rightIcon === 'object' && (
          <View style={inputStyle.rightIconMargin}>{rightIcon}</View>
        )}
      </View>
      {isPasswordStep && presentStep && totalStep && (
        <View
          onLayout={event => setStepLayout(event.nativeEvent.layout?.width)}
          style={inputStyle.mt}>
          <Stepper
            layout={stepLayout}
            presentStep={presentStep}
            totalStep={totalStep}
            gap={5}
          />
        </View>
      )}
      {isError && error?.trim() && (
        <Text style={inputStyle.error}>{error?.trim()}</Text>
      )}
      {info?.trim() && !error?.trim() && (
        <Text style={inputStyle.info}>{info?.trim()}</Text>
      )}
    </View>
  );
};

export default CustomInput;
