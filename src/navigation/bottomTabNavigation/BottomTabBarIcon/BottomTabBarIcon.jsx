import {View, Text} from 'react-native';
import React from 'react';
import {bottomTabBarIconStyle} from './bottomTabBarIcon.style';
import {useTheme} from '@react-navigation/native';

const BottomTabBarIcon = ({title, Icon, width, height, focused}) => {
  const {colors} = useTheme();
  const bottomTabBarStyle = bottomTabBarIconStyle(colors, focused);
  return (
    <View style={bottomTabBarStyle.cont}>
      {typeof Icon !== 'undefined' && (
        <Icon
          fill={focused ? colors.textTertiaryVariant : colors.tabIconUnfocused}
          height={height}
          width={width}
        />
      )}
      <Text style={bottomTabBarStyle.label}>{title}</Text>
    </View>
  );
};

export default BottomTabBarIcon;
