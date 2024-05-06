import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {settingsStyle} from './settingsStyle.js';
import CustomThemeSelection from '../components/ThemeSelect/CustomThemeSelection.jsx';
import SettingInfo from './SettingInfo/SettingInfo.jsx';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
} from '../../navigation/routeName/routeName.js';
import {useDispatch, useSelector} from 'react-redux';
import {updateTheme} from '../../features/slices/themeReducer/themeReducer.js';
import {useTranslation} from 'react-i18next';
import allLanguage from '../../utils/language/LanguageElements.json';
import LanguageBottomSheet from '../onboarding/Onboarding/LanguageBottomSheet/LanguageBottomSheet.jsx';
const Settings = ({navigation}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const styles = settingsStyle(colors);
  const languageBottomSheetRef = useRef(null);
  const handleLanguageBottomSheet = () => {
    Keyboard.dismiss();
    languageBottomSheetRef.current?.snapToIndex(0);
  };
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.themeReducer);
  const {language} = useSelector(state => state.languageReducer);
  const memorizedTheme = useCallback(value => {
    dispatch(updateTheme(value));
  }, []);
  const memorizedLanguage = useCallback(() => {
    const exits = allLanguage?.value.find(
      item => item.shortName?.toLowerCase() === language?.toLowerCase(),
    );
    return exits.name;
  }, [language]);
  const [fastLoad, setFastLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setFastLoad(false);
    }, 0);
  }, []);
  if (fastLoad) return <View />;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          style={styles.scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <View style={styles.container}>
            <Text style={styles.themeText}>{trans('Select Theme')}</Text>
            <View style={styles.themeContainer}>
              <CustomThemeSelection
                theme={'light'}
                isChecked={theme === 'light'}
                onPress={memorizedTheme}
              />
              <CustomThemeSelection
                theme={'dark'}
                isChecked={theme === 'dark'}
                onPress={memorizedTheme}
              />
            </View>
            <View style={styles.settingsFeatures}>
              <SettingInfo
                features={trans('Language')}
                onPress={() => handleLanguageBottomSheet()}
                featuresText={memorizedLanguage()}
              />
              <SettingInfo
                features={trans('Change Password')}
                onPress={() => navigation.navigate(CHANGE_PASSWORD)}
              />
              <SettingInfo
                features={trans('Edit Profile')}
                onPress={() => navigation.navigate(EDIT_PROFILE)}
                last={true}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LanguageBottomSheet
        data={allLanguage}
        bottomSheetRef={languageBottomSheetRef}
        selectItem={language}
      />
    </>
  );
};

export default memo(Settings);
