import {Text, Pressable, View} from 'react-native';
import React from 'react';
import {selectInputStyle} from './selectInputStyle';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

const SelectInput = ({
  label = '',
  style = {},
  title,
  icon,
  onPress,
  isError = false,
  error = '',
}) => {
  const [layout, setLayout] = useState(null);
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const selectInput = selectInputStyle(colors, title, isError, layout);
  return (
    <View>
      {label && <Text style={selectInput.label}>{label}</Text>}
      <Pressable
        onLayout={event => setLayout(event.nativeEvent.layout)}
        onPress={onPress}
        style={{...selectInput.selectInputCont, ...style}}>
        <Text style={selectInput.selectInputText} numberOfLines={1}>
          {title || trans('Select')}
        </Text>
        {icon}
      </Pressable>
      {isError && error && <Text style={selectInput.error}>{error}</Text>}
    </View>
  );
};

export default SelectInput;
