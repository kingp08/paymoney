import {View} from 'react-native';
import React, { useEffect } from 'react';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import {useTheme} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {useTranslation} from 'react-i18next';
import { validAccountNumber, validName, validSWIFTCode } from '../../utilities/Validation/Validation';
import { memo } from 'react';
import { useSelector } from 'react-redux';

const BankWithdraw = ({
  withdrawOptionBank,
  item,
  setWithdrawOptionBank,
  setError,
  error,
  handleCountryBottomSheet,
  selectedCountry,
  setSelectedCountry
}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const {userInfo} = useSelector(state => state.profileReducer);
  const checkNameValidation = (value, name)=>{
    setWithdrawOptionBank((prevState)=>({...prevState, [name]:value}));
    if(name==='swift_code'){
      const valid= validSWIFTCode(value);
      const errorText = 'valid_'+name;
      setError((prevState)=>({...prevState, [errorText] : valid}));
      return;
    }
    switch (name){
      case 'swift_code':
        const validS= validSWIFTCode(value);
        const errorTexts = 'valid_'+name;
        setError((prevState)=>({...prevState, [errorTexts] : validS}));
        return;
      case 'account_number':
        const validA= validAccountNumber(value);
        const errorTextA = 'valid_'+name;
        setError((prevState)=>({...prevState, [errorTextA] : validA}));
        return;
      default:
        const valid = validName(value);
        const errorText = 'valid_'+name;
        setError((prevState)=>({...prevState, [errorText] : valid}));
        return;
    }
  }
  useEffect(() => {
    if(item){
      setWithdrawOptionBank({
        ...withdrawOptionBank,
        account_holders_name: item.account_name,
        account_number: item?.account_number,
        branch_address: item?.bank_branch_address,
        branch_city: item?.bank_branch_city,
        branch_name: item?.bank_branch_name,
        bank_name: item?.bank_name,
        swift_code: item?.swift_code,
        id: item?.id,
      });
      const countryId = Number(item.country);
      const existingCountry = userInfo.countries.find(
      country => country.id === countryId,
      );
      if (existingCountry) {
        setSelectedCountry(existingCountry);
      }
    }
  }, [item]);
  return (
    <View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
            label={trans("Account Holder's Name")}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.account_holders_name}
            isError={error.account_holders_name || !error.valid_account_holders_name && withdrawOptionBank.account_holders_name}
            error={!error.valid_account_holders_name && withdrawOptionBank.account_holders_name ? trans('Please enter a valid name without special characters or numbers.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'account_holders_name')}
            maxLength={100}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
            label={trans('Account Number') + '/' + trans(' IBAN')}
            keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.account_number}
            isError={error.account_number || !error.valid_account_number && withdrawOptionBank.account_number}
            error={!error.valid_account_number && withdrawOptionBank.account_number ? trans('Please enter a valid account number.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'account_number')}
            maxLength={31}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
           label={trans('SWIFT Code')}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.swift_code}
            isError={error.swift_code || !error.valid_swift_code && withdrawOptionBank.swift_code}
            error={!error.valid_swift_code && withdrawOptionBank.swift_code ? trans('Please enter a valid SWIFT code.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'swift_code')}
            maxLength={12}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
            label={trans('Bank Name')}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.bank_name}
            isError={error.bank_name || !error.valid_bank_name && withdrawOptionBank.bank_name}
            error={!error.valid_bank_name && withdrawOptionBank.bank_name ? trans('Please enter a valid name without special characters or numbers.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'bank_name')}
            maxLength={50}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
           label={trans('Branch Name')}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.branch_name}
            isError={error.branch_name || !error.valid_branch_name && withdrawOptionBank.branch_name}
            error={!error.valid_branch_name && withdrawOptionBank.branch_name ? trans('Please enter a valid name without special characters or numbers.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'branch_name')}
            maxLength={50}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
            label={trans('Branch City')}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.branch_city}
            isError={error.branch_city || !error.valid_branch_city && withdrawOptionBank.branch_city}
            error={!error.valid_branch_city && withdrawOptionBank.branch_city ? trans('Please enter a valid name without special characters or numbers.') : trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'branch_city')}
            maxLength={50}
          />
      </View>
      <View style={createWithdrawstyle.currencyContainer}>
          <CustomInput
            label={trans('Branch Address')}
            style={createWithdrawstyle.transactionStepContainer}
            keyboardAppearance={'dark'}
            value={withdrawOptionBank.branch_address}
            isError={error.branch_address}
            error={trans('This field is required.')}
            onChangeText={value => checkNameValidation(value, 'branch_address')}
            maxLength={255}
          />
      </View>
      <View>
        <SelectInput
          label={trans('Country')}
          style={createWithdrawstyle.transactionStepContainer}
          onPress={() => handleCountryBottomSheet()}
          isError={error.country && !selectedCountry}
          error={error.country ? trans('This field is required.') : ''}
          icon={<RightIcon fill={colors.manatee} />}
          title={selectedCountry?.name}
        />
      </View>
    </View>
  );
};

export default memo(BankWithdraw);
