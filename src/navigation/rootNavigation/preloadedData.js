import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {updateLanguage} from '../../features/slices/languageReducer/languageReducer';
import {updateTheme} from '../../features/slices/themeReducer/themeReducer';

export const preloadedData = setIsFirstLaunch => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  useEffect(() => {
    async function check() {
      await AsyncStorage.multiGet(
        ['alreadyLaunched', 'language', 'theme'],
        (err, items) => {
          setIsFirstLaunch(items[0][1] === null || undefined ? true : false);
          !items[0][1] &&
            AsyncStorage.setItem('alreadyLaunched', JSON.stringify(true));
          dispatch(updateLanguage(items[1][1] || 'en'));
          dispatch(updateTheme(items[2][1] || scheme));
          SplashScreen.hide();
        },
      );
    }
    check();
  }, []);
};
