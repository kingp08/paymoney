import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import LanguageTranslatorLogo from '../../../assets/svg/translator.svg';
import DownArrow from '../../../assets/svg/downArrow.svg';
import {useTheme} from '@react-navigation/native';
import {onboardingStyle} from './onboarding.style';

const LanguageTranslator = ({openBottomSheetModal, language}) => {
  const {colors} = useTheme();
  const styles = onboardingStyle(colors);
  return (
    <View style={styles.languageTranslator}>
      <TouchableWithoutFeedback onPress={openBottomSheetModal}>
        <View style={styles.languageTranslatorContainer}>
          <LanguageTranslatorLogo fill={colors.white} />
          <Text style={styles.languageText}>{language}</Text>
          <DownArrow fill={colors.white} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LanguageTranslator;
