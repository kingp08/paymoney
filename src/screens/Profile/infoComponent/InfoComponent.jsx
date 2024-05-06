import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {infoComponentStyle} from './infoComponentStyle';
import {rs} from '../../../utils/styles/responsiveSize';
const InfoComponent = ({info, infoText, lastElement}) => {
  const {colors} = useTheme();
  const [layout, setLayout] = useState(null);
  const styles = infoComponentStyle(colors);
  return (
    <View>
      <View
        style={infoComponentStyle(colors, layout, lastElement).infoCont}
        onLayout={event => setLayout(event.nativeEvent.layout.width)}>
        <Text style={infoComponentStyle(colors, layout * 0.4 - rs(25)).info}>
          {info}
        </Text>
        <View style={infoComponentStyle(colors, layout * 0.6).textContParent}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoComponent;
