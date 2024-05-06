import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {profileCardStyle} from './profileCardStyle';

const ProfileCard = ({bgColor, text, lastUse, value, valueColor = false}) => {
  const {colors} = useTheme();
  const styles = profileCardStyle(colors, bgColor, valueColor);
  return (
    <View style={styles.profileCardCont}>
      <View style={styles.infoCard}>
        <Text style={styles.textS}>{text}</Text>
        {lastUse && <Text style={styles.lastUseS}>{lastUse}</Text>}
      </View>
      <Text style={styles.valueS}>{value}</Text>
    </View>
  );
};

export default ProfileCard;
