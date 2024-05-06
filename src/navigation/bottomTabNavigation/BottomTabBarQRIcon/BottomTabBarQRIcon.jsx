import {Text, Pressable, View} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {bottomTabBarQRIconStyle} from './bottomTabBarQRIcon.style';
import { QR_PAY } from '../../routeName/routeName';

const BottomTabBarQRIcon = ({focused, title, children}) => {
  const {colors} = useTheme();
  const styles = bottomTabBarQRIconStyle(colors, focused);
  const navigation=useNavigation()
  const HandleNavigation=()=>{
    navigation.navigate(QR_PAY)
  }
  return (
    <Pressable onPress={HandleNavigation} style={styles.cont}>
      <View style={styles.qrCode}>
        {children}
      </View>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
};

export default BottomTabBarQRIcon;
