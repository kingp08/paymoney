import {View, Text} from 'react-native';
import React from 'react';
import {accountTypeStyle} from './AccountTypeStyle';
import {useTheme} from '@react-navigation/native';
const AccountType = ({
  Icon,
  typeofText,
  isChecked,
  isCheckedIcon,
  CheckedIcon,
  style = {},
}) => {
  const {colors} = useTheme();
  const {
    accountTypeCon,
    typeofTextStyle,
    activeTypeofTextStyle,
    inactiveTypeofTextStyle,
    typeofContainer,
    activetypeofContainer,
    inactivetypeofContainer,
    iconStyle,
    checkedIconPosition,
  } = accountTypeStyle(colors);

  return (
    <View
      style={[
        accountTypeCon,
        isChecked ? activetypeofContainer : inactivetypeofContainer,
        style,
      ]}>
      <View>
        <View>
          <View style={[typeofContainer]}>
            <View style={checkedIconPosition}>
              {isCheckedIcon && CheckedIcon}
            </View>
            <View style={iconStyle}>{Icon}</View>
            <Text
              style={[
                typeofTextStyle,
                isChecked ? activeTypeofTextStyle : inactiveTypeofTextStyle,
              ]}>
              {typeofText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountType;
