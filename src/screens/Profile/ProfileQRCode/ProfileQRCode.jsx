import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MyProfile from '../../components/MyProfile/MyProfile';
import { profileQRCodeStyle } from './profileQRCode.style';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import { rs } from '../../../utils/styles/responsiveSize';
import QrCode from './QrCode/QrCode';

const ProfileQRCode = () => {
  const {colors}=useTheme()
  const styles=profileQRCodeStyle(colors);
  const {
    user: {first_name, last_name, email, picture}={},
  } = useSelector(state => state.loginUserReducer)||{};
  return (
    <ScrollView
      style={styles.scroll_view}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}>
      <View style={styles.container}>
        <MyProfile
          name={first_name?.concat(' ', last_name)}
          rightImage={
            <ProfileImage
              imageURL={picture}
              badgeIconBg={colors.cornflowerBlue}
              badgeIconBgSize={rs(21)}
              defaultColor={colors.green}
              imageSize={rs(50)}
              borderColor={colors.currencyIcon}
            />
          }
          style={styles.textAlign}
          email={email}
        />
        <QrCode/>
      </View>
    </ScrollView>
  );
};

export default ProfileQRCode;
