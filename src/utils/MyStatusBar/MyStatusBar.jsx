import {View, StatusBar} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {statusBarStyle} from './MyStatusBarStyle';

const MyStatusBar = ({backgroundColor, barStyle = 'light-content'}) => {
  const insets = useSafeAreaInsets();
  const style = statusBarStyle(insets);
  return (
    <View style={{backgroundColor, ...style.height}}>
      <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );
};

export default MyStatusBar;
