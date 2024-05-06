import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {bottomInfoStyle} from './bottomInfoStyle';
import {rs} from '../../../utils/styles/responsiveSize';
import CopyIcon from '../../../assets/svg/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
const BottomInfo = ({
  title = '',
  text = '',
  copy = false,
  last = false,
  email = '',
  statusColor = false,
  note = false,
}) => {
  const [layout, setLayout] = useState(null);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const {
    infoCont,
    textCont,
    text: textS,
    emailText,
  } = bottomInfoStyle(colors, statusColor, note, layout, text, last, copy) ||
  {};
  const copyToClipboard = text => {
    Clipboard.setString(text);
    handleToaster(trans('Copied to clipboard.'), 'copied', colors);
  };
  return (
    <View
      style={infoCont}
      onLayout={event => setLayout(event.nativeEvent.layout.width)}>
      <Text
        style={
          bottomInfoStyle(
            colors,
            statusColor,
            note,
            layout * 0.5 - rs(25),
            text,
            last,
            copy,
          ).title
        }>
        {title}
      </Text>
      <View
        style={
          bottomInfoStyle(
            colors,
            statusColor,
            note,
            layout * 0.5,
            text,
            last,
            copy,
          ).textContParent
        }>
        {text &&
          (copy ? (
            <TouchableOpacity
              onPress={() => (copy ? copyToClipboard(text) : '')}>
              <View style={textCont}>
                {copy && (
                  <CopyIcon
                    width={rs(16)}
                    height={rs(16)}
                    fill={colors.copyPrimary}
                  />
                )}
                <Text style={textS}>{text}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <View style={textCont}>
                {copy && (
                  <CopyIcon
                    width={rs(14)}
                    height={rs(14)}
                    fill={colors.copyPrimary}
                  />
                )}
                <Text style={textS}>{text}</Text>
              </View>
            </View>
          ))}

        {email && <Text style={emailText}>{email}</Text>}
      </View>
    </View>
  );
};

export default BottomInfo;
