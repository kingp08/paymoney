import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {drawerStyle} from './drawerStyle';
import {useSelector} from 'react-redux';
import ProfileImage from '../../screens/components/ProfileImage/ProfileImage';
import {rs} from '../../utils/styles/responsiveSize';
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawerHeader = () => {
  const {colors} = useTheme();
  const drawerStyles = drawerStyle(colors);
  const {
    user: {first_name, last_name, email, picture},
  } = useSelector(state => state.loginUserReducer);
  return (
    <SafeAreaView style={drawerStyles.container}>
      <View style={drawerStyles.header}>
      <ProfileImage imageURL={picture} imageSize={rs(58)} />
      <View style={drawerStyles.headerTextCont}>
        <Text style={drawerStyles.headerNameText}>
          {first_name?.concat(' ', last_name)}
        </Text>
        <Text style={drawerStyles.headerEmailText}>{email}</Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default DrawerHeader;
