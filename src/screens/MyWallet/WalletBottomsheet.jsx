import {View, Text, TouchableOpacity} from 'react-native';
import React, {Fragment, memo} from 'react';
import CustomBottomSheet from '../components/CustomBottomSheet/CustomBottomSheet';
import {inputFieldStyle} from '../components/components/InputField/inputFieldStyle';
import {withdrawMethodBottomSheetStyle} from '../Withdraw/CreateWithdraw/WithdrawMethodBottomSheet.style';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  CREATE_DEPOSIT,
  CREATE_SEND_CRYPTO,
  CREATE_SEND_MONEY,
  CREATE_WITHDRAW,
  MY_WALLET,
  RECEIVED_CRYPTO,
} from '../../navigation/routeName/routeName';
import {updateInfo} from '../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {getMyWallets} from '../../features/slices/myWallets/myWallets';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
import config from '../../../config';
import {getProfileSummary} from '../../features/slices/user/getProfile/getProfile';
import { providerStatusSelector } from '../../features/slices/myWallets/walletSelector';

const WalletBottomsheet = ({
  bottomSheetRef,
  newData,
}) => {
  const {colors} = useTheme();
  const inputFieldStyles = inputFieldStyle(colors);
  const style = withdrawMethodBottomSheetStyle(colors);
  const navigation = useNavigation();
  const {t: trans} = useTranslation();
  const {curr_code, curr_id, is_default, curr_type, id, provider} = newData || {};
  const {
    user: {first_name, last_name, token},
  } = useSelector(state => state.loginUserReducer);
  const {loading, tatumio, blockio} = useSelector(providerStatusSelector);
  const dispatch = useDispatch();
  const manageDefault = async () => {
    bottomSheetRef.current.close();
    const data = {default_wallet: curr_id, first_name, last_name};
    const URL = `${config.BASE_URL_VERSION}/profile/update`;
    const res = await updateInfo(data, URL, token);
    if (res.response.status.code === 200) {
      navigation.navigate(MY_WALLET);
      handleToaster(
        trans('Default Currency changed successfully'),
        'success',
        colors,
      );
      dispatch(getMyWallets({token}));
      dispatch(getProfileSummary({token}));
    }
  };
  const walletElements = {
    crypto_asset: [
      {method: trans('Send'), screen: CREATE_SEND_CRYPTO},
      {method: trans('Received'), screen: RECEIVED_CRYPTO},
    ],
    crypto: [
      {method: trans('Deposit'), screen: CREATE_DEPOSIT},
      {method: trans('Withdraw'), screen: CREATE_WITHDRAW},
    ],
    fiat: [
      {method: trans('Send Money'), screen: CREATE_SEND_MONEY},
      {method: trans('Deposit'), screen: CREATE_DEPOSIT},
      {method: trans('Withdraw'), screen: CREATE_WITHDRAW},
    ],
  };
  
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={['35%']}>
      <Text style={style.title}>
        {trans('Select Action')} ({curr_code})
      </Text>
      {loading ? (
        <Text style={style.textStyle}>{trans('Please Wait...')}</Text>
      ) : !loading &&
        ((provider == 'tatumio' && tatumio !== 'Active') || (provider == 'blockio' && blockio !== 'Active')) &&
        curr_type === 'crypto_asset' ? (
        <Text style={style.textStyle}>
          {trans(`Can't Send or Received Crypto! Contact with Admin.`)}
        </Text>
      ) : (
        walletElements[curr_type]?.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <View style={style.textBottomBorder}></View>}
              <TouchableOpacity
                style={style.textContainer}
                onPress={() => {
                  navigation.navigate(item?.screen, {
                    currency: {
                      code: curr_code,
                      id: curr_id,
                      type: curr_type,
                      typeID: id,
                      provider: provider
                    },
                  });
                  bottomSheetRef.current.close();
                }}>
                <Text style={style.textStyle}>{item?.method}</Text>
              </TouchableOpacity>
            </Fragment>
          );
        })
      )}
      {is_default !== 'Yes' && curr_type === 'fiat' && (
        <View style={style.textBottomBorder}></View>
      )}
      {is_default !== 'Yes' && curr_type === 'fiat' && (
        <TouchableOpacity style={style.textContainer} onPress={manageDefault}>
          <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
            {trans('Make Default')}
          </Text>
        </TouchableOpacity>
      )}
    </CustomBottomSheet>
  );
};

export default memo(WalletBottomsheet);
