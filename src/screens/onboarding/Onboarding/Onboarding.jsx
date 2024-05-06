import {View, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef} from 'react';
import LanguageTranslator from './LanguageTranslator';
import {useTheme} from '@react-navigation/native';
import {onboardingStyle} from './onboarding.style';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import LanguageBottomSheet from './LanguageBottomSheet/LanguageBottomSheet';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../../features/slices/languageReducer/languageReducer';
import {useTranslation} from 'react-i18next';
import {SIGN_IN, SIGN_UP} from '../../../navigation/routeName/routeName';
import allLanguage from '../../../utils/language/LanguageElements.json';
import {useCallback} from 'react';
const CustomImageCarousal = ({navigation}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const styles = onboardingStyle(colors);
  const bottomSheetRef = useRef(null);
  const handleToCurrencyBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.languageReducer);
  useEffect(() => {
    if (!language) {
      dispatch(updateLanguage('en'));
    }
  }, []);
  const memorizedLanguage = useCallback(() => {
    const exits = allLanguage?.value.find(
      item => item.shortName?.toLowerCase() === language?.toLowerCase(),
    );
    return exits?.name || 'English';
  }, [language]);
  return (
    <SafeAreaView style={styles.onboardingPage}>
      <StatusBar
        backgroundColor={colors.cornflowerBlue}
        barStyle={'light-content'}
      />
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <LanguageTranslator
          openBottomSheetModal={handleToCurrencyBottomSheet}
          language={memorizedLanguage()}
        />
        <ImageCarousel />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.replace('show-always', {screen: SIGN_UP})}
          title={trans('Register')}
          bgColor={colors.white}
          color={colors.gunPowder}
          style={styles.registerButton}
        />
        <CustomButton
          onPress={() => navigation.replace('show-always', {screen: SIGN_IN})}
          title={trans('Sign In')}
          bgColor={colors.haiti}
          color={colors.white}
          style={styles.signinButton}
        />
      </View>
      <LanguageBottomSheet
        data={allLanguage}
        bottomSheetRef={bottomSheetRef}
        selectItem={language}
      />
    </SafeAreaView>
  );
};

export default CustomImageCarousal;
