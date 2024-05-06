import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {cardInfoStyle} from './cardInfoStyle';
import {rs} from '../../../utils/styles/responsiveSize';
import CopyIcon from '../../../assets/svg/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {useState} from 'react';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
const CardInfo = ({
  title = '',
  text = '',
  copy = false,
  last = false,
  statusColor = false,
  paddingH,
}) => {
  const {colors} = useTheme();
  const [layout, setLayout] = useState(null);
  const {infoCont, text: textS} = cardInfoStyle(
    colors,
    statusColor,
    paddingH,
    layout?.width,
    last,
    copy,
  );
  const {t:trans} = useTranslation();
  const copyToClipboard = text => {
    Clipboard.setString(text);
    handleToaster(trans('Copied to clipboard.'), 'copied', colors);
  };
  return (
    <View>
      <View
        style={infoCont}
        onLayout={event => setLayout(event.nativeEvent.layout)}>
        <Text
          numberOfLines={1}
          style={
            cardInfoStyle(
              colors,
              statusColor,
              paddingH,
              layout?.width * 0.4 - rs(25),
            ).title
          }>
          {title}
        </Text>
        {copy ? (
          <TouchableOpacity onPress={() => (copy ? copyToClipboard(text) : '')}>
            <View
              style={
                cardInfoStyle(
                  colors,
                  statusColor,
                  paddingH,
                  layout?.width * 0.6,
                ).textCont
              }>
              {copy && (
                <CopyIcon
                  width={rs(14)}
                  height={rs(14)}
                  fill={colors.textOctonaryVariant}
                />
              )}
              <Text style={textS}>{text}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <View
              style={
                cardInfoStyle(
                  colors,
                  statusColor,
                  paddingH,
                  layout?.width * 0.6,
                ).textCont
              }>
              {copy && (
                <CopyIcon
                  width={rs(14)}
                  height={rs(14)}
                  fill={colors.textOctonaryVariant}
                />
              )}
              <Text style={textS}>{text}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CardInfo;
