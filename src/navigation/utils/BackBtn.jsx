import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import BackIcon from '../../assets/svg/backBtn.svg';
import { rs } from '../../utils/styles/responsiveSize';

const BackBtn = ({props, isBackMs = false, screen}) => {
  const {colors} = useTheme()
  const navigation = useNavigation();

  const handlePress = () => {
    if(screen) {
      navigation.navigate(screen)
    } else {
      navigation.goBack();
      if(isBackMs) {
        navigation.goBack();
      }
    }
  }

  const backBtnStyles = BackBtnStyles();
  return (
    <Pressable
        style={backBtnStyles.cont}
        {...props}
        onPress={handlePress}
        android_ripple={backBtnStyles.ripple}>
        <BackIcon
            height={rs(21)} 
            width={rs(21)}
            fill={colors.headerSecondary}
        />
    </Pressable>
  );
};

export default BackBtn;

const BackBtnStyles = () =>
  StyleSheet.create({
    cont: {
      padding: rs(10),
      position: 'absolute',
      left: rs(-10),
      borderRadius: 50,
    },
    ripple: {
      color: '#999999',
      radius: rs(20),
    },
  });
