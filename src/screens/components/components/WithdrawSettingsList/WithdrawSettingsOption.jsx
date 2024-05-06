import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {withdrawSettingsOptionStyle} from './WithdrawSettingsOption.style';
import {useTheme} from '@react-navigation/native';
import {EDIT_WITHDRAW_SETTINGS} from '../../../../navigation/routeName/routeName';
import {useNavigation} from '@react-navigation/native';
import {hideMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
const WithdrawSettingsOption = ({
  withdrawSettingsData,
  methodName,
  containerHorizontalGap,
  bgColor,
  titleColor,
  deleteIcon,
  actionIcon,
  setModalVisible,
  setDeleteItemId,
  setWithdrawMethod,
  setWithdrawCurrency,
}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const navigation = useNavigation();
  const style = withdrawSettingsOptionStyle(
    colors,
    containerHorizontalGap,
    bgColor,
    titleColor,
  );

  const paymentMethodLength = withdrawSettingsData?.[methodName].length;

  const handleDelete = id => {
    setModalVisible(true);
    setDeleteItemId(id);
  };

  const handleEdit = item => {
    hideMessage();
    navigation.navigate(EDIT_WITHDRAW_SETTINGS, {
      item: item,
      setWithdrawMethod,
      setWithdrawCurrency,
    });
  };

  return (
    <View
      style={[
        style.container,
        paymentMethodLength == 0 && style.containerPadding,
      ]}>
      <View style={[style.titleContainer]}>
        <Text style={style.title}>{methodName}</Text>
        {paymentMethodLength == 0 && (
          <Text style={style.addressText}>{trans('No Records found')}</Text>
        )}
      </View>

      {withdrawSettingsData?.[methodName].map((value, index) => (
        <View
          key={index}
          style={[
            style.optionContainer,
            index != paymentMethodLength - 1 && style.bottomBorder,
          ]}>
          <View>
            {value.account_name && (
              <Text style={style.nameText}>{value.account_name}</Text>
            )}
            {value.account_number && (
              <Text style={style.addressText}>{value.account_number}</Text>
            )}
            {value.email && <Text style={style.emailText}>{value.email}</Text>}
            {value.crypto_address && (
              <Text style={style.addressText}>{value.crypto_address}</Text>
            )}
          </View>
          <View style={style.iconContainer}>
            <TouchableOpacity
              onPress={() => handleEdit(value)}
              style={{...style.textStyle, ...style.actionIcon, ...style.editIcon}}>
              {actionIcon}
            </TouchableOpacity >
            <TouchableOpacity
              onPress={() => handleDelete(value.id)}
              style={{ ...style.textStyle, ...style.deleteIcon }}>
              {deleteIcon}
            </TouchableOpacity >
          </View>
        </View>
      ))}
    </View>
  );
};

export default WithdrawSettingsOption;
