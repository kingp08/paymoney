import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {onboardingStyle} from '../onboarding.style';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
const {height, width} = Dimensions.get('window');
const OnboardingDisplay = ({
  item: {Image, title, subtitle, description},
} = {}) => {
  const {colors} = useTheme();
  const styles = onboardingStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <View style={styles.onboardingContainer}>
      <View style={styles.onboardingImageContainer}>
        <Image
          height={height > 700 ? height * 0.4 : height * 0.3}
          width={width}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{trans(title)}</Text>
        <Text style={styles.subtitle}>{trans(subtitle)}</Text>
        <Text style={styles.description}>{trans(description)}</Text>
      </View>
    </View>
  );
};
export default OnboardingDisplay;
