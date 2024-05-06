import {StyleSheet} from 'react-native';

export const statusBarStyle = insets => {
  return StyleSheet.create({
    height: insets.top,
  });
};
