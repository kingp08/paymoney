import {StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';

export const styles = colors => StyleSheet.create({
  navigation:{borderRadius:50, padding:5, position:'absolute', right:rs(-30)},
});

export const screenOptions = colors => ({
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.bgPrimary,
  },
  headerTintColor: colors.textSenary,
  animation: 'slide_from_right',
  animationDuration: 400,
  headerTitleStyle: {fontSize: rs(18), fontFamily: 'Gilroy-Semibold'},
});
