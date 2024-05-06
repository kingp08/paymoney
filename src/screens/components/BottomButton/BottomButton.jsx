import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {bottomButtonStyle} from './bottomButton.style';
import {HOME} from '../../../navigation/routeName/routeName';

const BottomButton = ({no, yes, style, onPress, disable}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = bottomButtonStyle(colors, disable);
  return (
    <View style={[styles.footerCont, style]}>
      <TouchableOpacity
        style={styles.cancel}
        onPress={() => navigation.navigate(HOME)}>
        <Text style={styles.cancelBtn}>{no}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} disabled={disable ? true : false}>
        <View style={styles.depositNowBtn}>
          {typeof yes === 'string' ? (
            <Text style={{...styles.cancelBtn, ...styles.btnColor}}>{yes}</Text>
          ) : (
            yes
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;
