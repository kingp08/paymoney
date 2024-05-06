import {View} from 'react-native';
import React from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomPhoneNumberInput from '../../components/CustomTextInput/CustomPhoneNumberInput/CustomPhoneNumberInput';
import {useTheme} from '@react-navigation/native';
import {editProfileStyle} from './editProfileStyle';
import {useTranslation} from 'react-i18next';
import {isValidNumber} from 'react-native-phone-number-input';
import {postInfo} from '../../../features/auth/login/loginApi';
import config from '../../../../config';
import {memo} from 'react';
const InputComponent = ({
  data: {
    setPhnDetails,
    phnDetails,
    error,
    setError,
    validNumber,
    setValidNumber,
    setCheckValidIdentity,
    token,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    isConnected,
  },
}) => {
  const {colors} = useTheme();
  const styles = editProfileStyle(colors);
  const {t:trans} = useTranslation();
  const checkValidIdentity = async (value, URL) => {
    setCheckValidIdentity(true);
    const res = await postInfo(value, URL, token, 'POST');
    if (res?.response?.status?.code !== 200) {
      setCheckValidIdentity(false);
      setError({...error, ownIdentity: trans(res?.response?.records?.phone[0])});
    } else {
      setCheckValidIdentity(false);
      setError({...error, ownIdentity: ''});
    }
  };
  const doCheckValidity = value => {
    setPhnDetails({...phnDetails, phone: value});
    if (isValidNumber(`+${phnDetails.code + value}`) && isConnected) {
      const reqInfo = {
        phone: value,
      };
      const URL = `${config.BASE_URL_VERSION}/profile/duplicate-phone-number-check`;
      checkValidIdentity(reqInfo, URL);
    }
  };
  return (
    <>
      <View style={styles.flexCont}>
        <CustomInput
          style={styles.selectInput}
          label={trans('First Name') + '*'}
          value={firstName}
          isError={error.first_name && !firstName}
          error={trans('This field is required.')}
          onChangeText={text => setFirstName(text)}
        />
        <CustomInput
          style={styles.selectInput}
          label={trans('Last Name') + '*'}
          value={lastName}
          isError={error.last_name && !lastName}
          error={trans('This field is required.')}
          onChangeText={text => setLastName(text)}
        />
      </View>
      <CustomInput
        label={trans('Email Address') + '*'}
        value={email}
        editable={false}
        style={styles.mb_16}
      />

      <View style={styles.mb_16}>
        <CustomPhoneNumberInput
          label={trans('Phone Number')}
          phnDetails={phnDetails}
          setPhnDetails={setPhnDetails}
          setIsValidNumber={setValidNumber}
          handlePhoneNumber={number => {
            doCheckValidity(number);
          }}
          style={styles.inputWidth}
          error={!validNumber || error.ownIdentity}
          isError={
            (!validNumber && trans('This number is Invalid.')) || error.ownIdentity
          }
        />
      </View>
      <CustomInput
        label={trans('Address')}
        value={address}
        onChangeText={text => setAddress(text)}
        multiline={true}
        numberOfLines={5}
        style={styles.mb_16}
        textAlignVertical={'top'}
      />
      <View style={styles.flexCont}>
        <CustomInput
          style={styles.selectInput}
          label={trans('City')}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <CustomInput
          style={styles.selectInput}
          label={trans('State')}
          value={state}
          onChangeText={text => setState(text)}
        />
      </View>
    </>
  );
};

export default memo(InputComponent);
