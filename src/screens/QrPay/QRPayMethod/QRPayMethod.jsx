import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import ArrowIcon from '../../../assets/svg/rightArrow.svg';
import { SCAN_QR_CODE } from '../../../navigation/routeName/routeName';
const QRPayMethod = ({method, styles}) => {
  const {colors} = useTheme();
  const navigation=useNavigation()
  const openScanner=()=>{
      navigation.navigate(SCAN_QR_CODE, {method: method})
  }
  return (
    <Pressable onPress={openScanner}
      android_ripple={{color: colors.btnQuinary}}
      style={styles.qrMethodCont}>
      <View style={styles.methodCont}>
        {method?.icon}
        <Text style={styles.methodText}>{method?.method}</Text>
      </View>
      <View>
        <ArrowIcon fill={colors.textSeptenary} />
      </View>
    </Pressable>
  );
};

export default QRPayMethod;
