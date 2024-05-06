import {View, Text, Pressable} from 'react-native';
import React from 'react';
import QRCode from '../../../assets/svg/scan.svg';
import RightArrow from '../../../assets/svg/rightArrowWithBox.svg';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import {rs} from '../../../utils/styles/responsiveSize';
import {profileStyle} from '../profileStyle';
import {PROFILE_QR_CODE} from '../../../navigation/routeName/routeName';
const ProfileQrButton = () => {
  const {t: trans} = useTranslation();
  const {colors} = useTheme();
  const styles = profileStyle(colors);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(PROFILE_QR_CODE)}
      style={styles.qrButtonCont}>
      <View style={styles.qrCodeCont}>
        <QRCode fill={colors.rightArrow} height={rs(20)} width={rs(20)} />
        <Text style={styles.qrCodeText}>{trans('Profile QR Code')}</Text>
      </View>
      <RightArrow fill={colors.rightArrow} />
    </Pressable>
  );
};

export default ProfileQrButton;
