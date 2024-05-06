import {Text, View} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import {actionsCardStyle} from './actionsCardStyle';
import RippleButton from '../../utilities/RippleButton/RippleButton';

const ActionsCard = ({
  bg,
  icon,
  text,
  textColor,
  borderColor,
  last,
  onPress,
  fixedWidth,
}) => {
  const {colors} = useTheme();
  const {container, card, flex, textS} = actionsCardStyle(
    colors,
    bg,
    textColor,
    borderColor,
    last,
    fixedWidth,
  );
  return (
    <View style={container}>
      <RippleButton onTap={onPress} style={card}>
        <View style={flex}>
          {icon}
          <Text style={textS}>{text}</Text>
        </View>
      </RippleButton>
    </View>
  );
};

export default memo(ActionsCard);
