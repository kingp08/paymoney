import {View, Text} from 'react-native';
import React from 'react';

import WithdrawSettingsOption from './WithdrawSettingsOption';
import {withdrawSettingsListStyle} from './WithdrawSettingsList.style';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {withdrawSettingsOptionStyle} from './WithdrawSettingsOption.style';
const WithdrawSettingsList = ({
  containerHorizontalGap,
  bgColor,
  titleColor,
  withdrawSettingsData,
  actionIcon,
  deleteIcon,
  setModalVisible,
  setDeleteItemId,
  setWithdrawMethod,
  setWithdrawCurrency,
}) => {
  const {colors} = useTheme();
  const style = withdrawSettingsListStyle(colors);
  const withdrawMethod = Object.keys(withdrawSettingsData);
  const {t:trans} = useTranslation();
  const optionStyle = withdrawSettingsOptionStyle(colors);
  return (
    <View style={style.container}>
      {withdrawMethod.length > 0 ? (
        withdrawMethod.map((methodName, index) => (
          <View key={index}>
            <WithdrawSettingsOption
              withdrawSettingsData={withdrawSettingsData}
              methodName={methodName}
              containerHorizontalGap={
                containerHorizontalGap && containerHorizontalGap
              }
              bgColor={bgColor}
              titleColor={titleColor}
              actionIcon={actionIcon}
              deleteIcon={deleteIcon}
              setModalVisible={setModalVisible}
              setDeleteItemId={setDeleteItemId}
              setWithdrawMethod={setWithdrawMethod}
              setWithdrawCurrency={setWithdrawCurrency}
            />
          </View>
        ))
      ) : (
        <View>
          {['Paypal', 'Bank', 'Crypto'].map((methodName, index) => (
            <View key={index} style={{...style.emptyContainer}}>
              <View style={[optionStyle.titleContainer]}>
                <Text style={style.title}>{methodName}</Text>
                <Text style={optionStyle.addressText}>
                  {trans('No Records found')}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default WithdrawSettingsList;
