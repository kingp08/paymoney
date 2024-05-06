import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {noRecordCardStyle} from './noRecordCard.style';

const NoRecordCard = ({text, style}) => {
  const {colors} = useTheme();
  const {container, textStyle} = noRecordCardStyle(colors);
  return (
    <View style={[container, style]}>
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};

export default NoRecordCard;
