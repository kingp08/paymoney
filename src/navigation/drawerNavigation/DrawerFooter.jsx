import {Text, View} from 'react-native';
import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import {drawerButtonStyle, drawerStyle} from './drawerStyle';
import LogOutIcon from '../../assets/svg/drawer-logout.svg';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {handleLogOut} from '../../screens/utilities/handleLogout/handleLogout';

const DrawerFooter = ({focused}) => {
  const {colors} = useTheme();
  const drawerStyles = drawerStyle(colors, focused, 'logout', 1);
  const styles = drawerButtonStyle(colors);
  const dispatch = useDispatch();
  const {t:trans} = useTranslation();
  return (
    <DrawerItem
      label={() => {
        return (
          <View style={drawerStyles.itemCont}>
            <LogOutIcon fill={colors.lavenderGray} />
            <Text style={drawerStyles.itemText}>{trans('Logout')}</Text>
          </View>
        );
      }}
      style={styles.drawerItemCont}
      onPress={() => {
        handleLogOut(dispatch);
      }}
    />
  );
};

export default DrawerFooter;
