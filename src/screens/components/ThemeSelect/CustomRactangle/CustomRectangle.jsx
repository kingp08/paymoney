import {View} from 'react-native';
import React from 'react';
import {customRectangleStyle} from './customRectangle.style';

const CustomRectangle = ({height, width, radius, bgColor, style}) => {
  const {container} = customRectangleStyle(height, width, radius, bgColor);
  return <View style={[style, container]}></View>;
};

export default CustomRectangle;
