import {StyleSheet} from 'react-native';

export const customRectangleStyle = (height, width, radius, bgColor) => {
  return StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderRadius: radius,
      backgroundColor: bgColor,
    },
  });
};
