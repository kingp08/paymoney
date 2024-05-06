import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, Text, View} from 'react-native';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';
import {customPhoneNumberInputStyle} from './customPhoneNumberInputStyle';
import DownArrow from '../../../../assets/svg/downArrow.svg';
import {rs} from '../../../../utils/styles/responsiveSize';
import {useEffect} from 'react';
import {useRef} from 'react';
import {useCallback} from 'react';
const CustomPhoneNumberInput = ({
  phnDetails,
  setPhnDetails,
  handlePhoneNumber,
  handleFormattedPhnNumber,
  phoneNumber,
  downArrow,
  bgColor,
  codeTextColor,
  phnTextColor,
  borderColor,
  phnIcon,
  disabled,
  style,
  error,
  setIsValidNumber,
  label,
  isError,
  rightIcon
}) => {
  const {colors} = useTheme();
  const handlePhoneCode = phnCode => {
    if (!phnDetails.hasOwnProperty('code')) {
      callCode = `+${phnCode.callingCode}`;
      phnDetails.phnCode = callCode;
    } else {
      setPhnDetails({
        ...phnDetails,
        code: phnCode.callingCode[0]?.toString(),
        countryCode: phnCode?.cca2,
      });
    }
  };
  const phnNumLength =
    phoneNumber?.length ||
    phnDetails.phone?.length ||
    phnDetails.phoneNumber?.length;
  const [layout, setLayout] = useState(null);
  const phoneNumberStyle = customPhoneNumberInputStyle(
    colors,
    bgColor,
    codeTextColor,
    phnTextColor,
    borderColor,
    phnIcon,
    phnNumLength,
    error,
    layout,
  );
  const {t:trans} = useTranslation();
  const {theme} = useSelector(state => state.themeReducer);
  const phoneInput = useRef();
  const handleFormattedNumber = value => {
    if (
      value?.search('undefined' || 'null') === -1 &&
      value?.length > 0 &&
      value !== phoneInput.current?.state?.code
    ) {
      isValidNumber(value) ? setIsValidNumber(true) : setIsValidNumber(false);
      !phnDetails.hasOwnProperty('code') && handleFormattedPhnNumber(value);
    } else {
      setIsValidNumber(true);
    }
  };
  const memorizedCallback = useCallback(() => {
    if (phnDetails.code) {
      phoneInput.current?.setState({
        countryCode: isNaN(Number(phnDetails.countryCode))
          ? phnDetails.countryCode?.toUpperCase()
          : 'US',
        number: phnDetails.phone || phnDetails.phoneNumber,
        code: phnDetails.code?.toString(),
      });
    } else {
      phoneInput.current?.setState({
        countryCode: 'US',
        number: '',
        code: '1',
      });
      if (phnDetails.hasOwnProperty('code')) {
        setPhnDetails({...phnDetails, countryCode: 'US', code: '1'});
      }
    }
  }, [phnDetails.code, phnDetails.countryCode, phnDetails.phone]);
  useEffect(() => {
    memorizedCallback();
  }, [memorizedCallback]);
  return (
    <View>
      {label && <Text style={phoneNumberStyle.inputTitle}>{label}</Text>}
      <View onLayout={event => setLayout(event.nativeEvent.layout)}>
        <View style={phoneNumberStyle.phnIconStyle}>{phnIcon}</View>
        <Pressable style={phoneNumberStyle.container}>
          <PhoneInput
            ref={phoneInput}
            disabled={disabled ? disabled : false}
            layout="first"
            onChangeText={handlePhoneNumber}
            onChangeCountry={phnCode => {
              handlePhoneCode(phnCode);
            }}
            onChangeFormattedText={formattedPhnNumber =>
              handleFormattedNumber(formattedPhnNumber)
            }
            filterProps={{placeholder: trans('Enter country name')}}
            textInputProps={{
              placeholderTextColor: colors.textQuaternaryVariant,
            }}
            countryPickerProps={{
              disableNativeModal: false,
            }}
            renderDropdownImage={
              <DownArrow
                fill={colors.mailIcon}
                width={rs(10)}
                height={rs(10)}
                style={phoneNumberStyle.ml_4}
              />
            }
            containerStyle={[
              phoneNumberStyle.phoneContainer,
              borderColor && phoneNumberStyle.activeBorderColor,
              style,
            ]}
            textContainerStyle={phoneNumberStyle.textInput}
            flagButtonStyle={phoneNumberStyle.flagBtnStyle}
            codeTextStyle={phoneNumberStyle.codeText}
            textInputStyle={phoneNumberStyle.phnText}
            placeholder={trans('Phone Number')}
            withDarkTheme={theme === 'dark'}
          />
        </Pressable>
       <View style={phoneNumberStyle.icon}>
        {rightIcon}
       </View>
      </View>
      {error && isError?.trim() && (
        <Text style={phoneNumberStyle.error}>{isError?.trim()}</Text>
      )}
    </View>
  );
};

export default CustomPhoneNumberInput;
