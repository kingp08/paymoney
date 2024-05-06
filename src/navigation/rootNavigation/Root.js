import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ONBOARDING} from '../routeName/routeName';
import Onboarding from '../../screens/onboarding/Onboarding/Onboarding';
import {useState} from 'react';
import ShowAlways from './ShowAlways';
import {preloadedData} from './preloadedData';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {handleLogOut} from '../../screens/utilities/handleLogout/handleLogout';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

const Root = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const {isConnected} = useContext(NetworkContext);
  const [restored, setRestored] = useState(false);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  preloadedData(setIsFirstLaunch);
  useEffect(() => {
    if (!isConnected) {
      handleToaster(trans('No internet connection'), 'internet-warning', colors);
      setRestored(true);
    } else if (isConnected && restored) {
      handleToaster(trans('Back to online'), 'internet-success', colors);
    }
  }, [isConnected]);
  const {fetch: originalFetch} = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;
    let response = await originalFetch(resource, config);
    if (response.status === 401 && !response.url.includes('paypal')) {
      handleLogOut(dispatch);
      handleToaster(
        trans('Your account is inactivated. Please try again later!'),
        'error',
        colors,
      );
    }
    return response;
  };
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 400,
        }}>
        {isFirstLaunch === true && (
          <Stack.Group>
            <Stack.Screen name={ONBOARDING} component={Onboarding} />
          </Stack.Group>
        )}
        <Stack.Group>
          <Stack.Screen name="show-always" component={ShowAlways} />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="show-always" component={ShowAlways} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
};

export default Root;
