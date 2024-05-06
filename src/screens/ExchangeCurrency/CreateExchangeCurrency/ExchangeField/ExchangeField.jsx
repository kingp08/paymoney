import {View, Text} from 'react-native';
import React from 'react';
import CustomInput from '../../../components/CustomInput/CustomInput';
import SelectInput from '../../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../../assets/svg/rightArrow.svg';
import {useTheme} from '@react-navigation/native';
import {exchangeFieldStyle} from './exchangeField.style';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Loader from '../../../../utils/Loader/Loader';
const ExchangeField = ({
  selectLabel,
  inputLabel,
  value,
  balance,
  style,
  maxLength,
  onChangeText,
  isError,
  error,
  placeholder,
  isEditable = true,
  isConvertible = false,
  handleBottomSheet,
  formCurrency,
  toCurrency,
  currencyError = false,
  loadingToWallet = false,
}) => {
  const {colors} = useTheme();
  const styles = exchangeFieldStyle(colors);
  const {preference} = useSelector(state => state.preference);
  const {t:trans} = useTranslation();
  return (
    <View>
      <View style={[styles?.pickerContainer, style]}>
        <View>
          <SelectInput
            label={selectLabel}
            style={styles?.selectInput}
            onPress={() => handleBottomSheet()}
            title={
              selectLabel === trans('From') ? formCurrency?.code : toCurrency?.code
            }
            icon={<RightIcon fill={colors.manatee} />}
            isError={currencyError}
          />
        </View>
        <View>
          <CustomInput
            label={inputLabel}
            placeholder={
              placeholder ||
              parseFloat('0.0').toFixed(preference?.decimal_format_amount || 2)
            }
            keyboardAppearance={'dark'}
            value={value?.toString()}
            style={styles?.customInput}
            rightIcon={
              <View>
                <Loader
                  source={require('../../../../assets/lottie/loader.json')}
                  size={[styles.lottie, !loadingToWallet && styles.display_none]}
                  color={colors.textTertiaryVariant}
                />
            </View>
            }
            keyboardType={'number-pad'}
            isError={isError}
            returnKeyType={'done'}
            onChangeText={onChangeText}
            maxLength={Number(maxLength?.current) || 99}
            editable={isEditable}
            isConvertible={isConvertible}
            error={error}
          />
          {balance && !isError && formCurrency?.code && (
            <Text style={styles.balanceText}>
              {trans('Balance')}: {balance}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExchangeField;
