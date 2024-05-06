import React from 'react';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {editProfileStyle} from './editProfileStyle';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
const SelectInputComponent = ({
  data: {
    handleCountryBottomSheet,
    handleTimezoneBottomSheet,
    handleCurrencyBottomSheet,
    country,
    timezone,
    currency,
  },
}) => {
  const {colors} = useTheme();
  const styles = editProfileStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <>
      <SelectInput
        style={styles.mb_16}
        label={trans('Country')}
        onPress={() => handleCountryBottomSheet()}
        icon={<RightIcon fill={colors.textQuaternaryVariant} />}
        title={country?.name}
      />
      <SelectInput
        style={styles.mb_16}
        label={trans('Time Zone')}
        title={timezone}
        onPress={() => handleTimezoneBottomSheet()}
        icon={<RightIcon fill={colors.textQuaternaryVariant} />}
      />
      <SelectInput
        label={trans('Default Wallet')}
        title={currency?.code}
        onPress={() => handleCurrencyBottomSheet()}
        icon={<RightIcon fill={colors.textQuaternaryVariant} />}
      />
    </>
  );
};

export default memo(SelectInputComponent);
