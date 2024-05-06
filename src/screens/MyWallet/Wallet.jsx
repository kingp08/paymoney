import {View, Text} from 'react-native';
import React, {memo, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {MyWalletStyle} from './MyWalletStyle';
import RightArrow from '../../assets/svg/rightArrow.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import RippleButton from '../utilities/RippleButton/RippleButton';
import config from '../../../config';
import {useDispatch, useSelector} from 'react-redux';
import {providerStatus} from '../../features/slices/myWallets/providerStatus';
import {providerStatusSelector} from '../../features/slices/myWallets/walletSelector';

const Wallet = ({
  item,
  amountColor,
  setNewData,
  setIndividualRef,
}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const rightArrowFill = colors.rightArrow;
  const currencyIconFill = colors.currencyIcon;
  const {balance, is_default, curr_code, curr_symbol, id, curr_id, curr_type, provider} =
    item || {};
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer);
  const {tatumio, blockio} = useSelector(providerStatusSelector);
  const style = MyWalletStyle(colors, amountColor, currencyIconFill);
  const {t: trans} = useTranslation();
  const individualRef = useRef(null);

  const handleWallet = async () => {
    setNewData(item);
    individualRef.current?.snapToIndex(0);
    setIndividualRef(individualRef);
    if (curr_type === 'crypto_asset') {
      if(provider == 'tatumio' && tatumio == 'Inactive') {
        let url = `${config.BASE_URL_VERSION}/crypto/send/tatumio/provider-status`;
        dispatch(providerStatus({token, url}))
      } else if(provider == 'blockio' && blockio == 'Inactive') {
        let url = `${config.BASE_URL_VERSION}/crypto/send/blockio/provider-status`;
        dispatch(providerStatus({token, url}))
      }
    }
  };
  return (
    <View style={style.walletContainer}>
      <RippleButton
        onTap={() => handleWallet()}
        style={style.singleWalletContainer}>
        <View style={style.flex}>
          <View style={style.currencyNameIcon}>
            <View style={style.currencyIcon}>
              <Text style={style.currencySymbol}>{curr_symbol}</Text>
            </View>
            <View>
              <Text style={style.currencyName}>{curr_code}</Text>
            </View>
            {is_default == 'Yes' && (
              <View>
                <Text style={style.defaultText}>({trans('default')})</Text>
              </View>
            )}
          </View>
          <View style={style.currencyNameIcon}>
            <Text style={style.amountText}>{balance}</Text>
            <TouchableOpacity style={style.rightArrow}>
              <RightArrow fill={rightArrowFill} />
            </TouchableOpacity>
          </View>
        </View>
      </RippleButton>
    </View>
  );
};

export default memo(Wallet);
