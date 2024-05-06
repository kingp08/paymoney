import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigation from '../bottomTabNavigation/BottomTabNavigation';
import {BOTTOM_TAB} from '../routeName/routeName';
import DrawerContainer from './DrawerContainer';
import HeaderTitleFunc from '../utils/HeaderTitleFunc';
import {screenOptions} from '../navigationStyles/navigationStyles';
import {useTheme} from '@react-navigation/native';
import MenuIcon from '../../assets/svg/menu.svg';
import {Dimensions, Pressable} from 'react-native';
import HeaderShadowFunc from '../utils/HeaderShadowFunc';
import {drawerButtonStyle} from './drawerStyle';

const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('screen');
const DrawerNavigation = () => {
  const {colors} = useTheme();
  const styles = drawerButtonStyle(colors);
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => null,
        ...screenOptions(colors),
        drawerIcon: () => null,
        drawerType: 'front',
        drawerStyle: {
          width: width * 0.7,
        },
        drawerPosition: 'right',
        headerRight: () => (
          <Pressable onPress={navigation.openDrawer} style={styles.p_20}>
            <MenuIcon />
          </Pressable>
        ),
      })}
      drawerContent={props => <DrawerContainer {...props} />}>
      <Drawer.Screen
        name={BOTTOM_TAB}
        component={BottomTabNavigation}
        options={({route}) => ({
          headerTitle: HeaderTitleFunc(route),
          headerShadowVisible: HeaderShadowFunc(route),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
