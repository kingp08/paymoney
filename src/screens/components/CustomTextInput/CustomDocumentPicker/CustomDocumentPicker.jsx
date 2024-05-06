import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {customDocumentPickerStyle} from './customDocumentPicker.style';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';

const CustomDocumentPicker = ({
  label = '',
  style = {},
  onPress,
  icon,
  value,
  title,
  error = '',
  isError = false,
  info = '',
}) => {
  const {colors} = useTheme();
  const [layout, setLayout] = useState(null);
  const documentPickerStyle = customDocumentPickerStyle(
    colors,
    value,
    isError,
    layout,
  );
  return (
    <View>
      {label && <Text style={documentPickerStyle.label}>{label}</Text>}
      <Pressable
        onLayout={event => setLayout(event.nativeEvent.layout)}
        onPress={onPress}
        style={{...documentPickerStyle.documentPickerCont, ...style}}>
        {icon}
        <View style={documentPickerStyle.verticalLine} />
        {value?.length ? (
          <Text
            style={documentPickerStyle.documentPickerText}
            numberOfLines={1}>
            {value.map(
              (v, i) => `${v.name.length>30?v.name.slice(12).split('.')[0]+"..."+v.name.split('.')[1]: v.name}`,
            )}
          </Text>
        ) : (
          <Text style={documentPickerStyle.documentPickerText}>{title}</Text>
        )}
      </Pressable>
      {error.trim() && (
        <Text style={documentPickerStyle.error}>{error.trim()}</Text>
      )}
      {info.trim() && !error.trim() && (
        <Text style={documentPickerStyle.info}>{info.trim()}</Text>
      )}
    </View>
  );
};

export default CustomDocumentPicker;
