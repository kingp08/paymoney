import {View, Text, Pressable} from 'react-native';
import React, {memo} from 'react';
import {checkWalletsStyle} from './checkWalletsStyle';
import {useTheme} from '@react-navigation/native';

const CheckWallets = ({
  bg,
  leftIcon,
  rightIcon,
  leftIconBg,
  rightIconBg,
  headerText,
  mainText,
  mainTextColor,
  onPress,
  style = {},
}) => {
  const {colors} = useTheme();
  const {
    container,
    leftContainer,
    leftIconS,
    textContainer,
    headerTextS,
    rightIconS,
    mainTextS,
    flex,
    card,
  } = checkWalletsStyle(colors, bg, rightIconBg, leftIconBg, mainTextColor);
  return (
    <View style={container}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: colors.gunPowder}}
        style={[card, style]}>
        <View style={[flex]}>
          <View style={leftContainer}>
            <View style={leftIconS}>{leftIcon}</View>
            <View style={textContainer}>
              {headerText && <Text style={headerTextS}>{headerText}</Text>}
              {mainText && <Text style={mainTextS}>{mainText}</Text>}
            </View>
          </View>
          <View style={rightIconS}>{rightIcon}</View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(CheckWallets);
