import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AddNewPassword from '../../authentication/signin/ResetPassword/AddNewPassword/AddNewPassword';
import PasswordChangeSuccess from '../../authentication/signin/ResetPassword/PasswordChangeSuccess/PasswordChangeSuccess';
import ResetPassword from '../../authentication/signin/ResetPassword/ResetPassword';
import VerifyAccount from '../../authentication/signin/ResetPassword/VerifyAccount/VerifyAccount';
import SignIn from '../../authentication/signin/SignIn';
import SignUp from '../../authentication/signup/SignUp';
import {screenOptions, styles} from '../navigationStyles/navigationStyles';
import MainStack from '../mainStack/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {
  ACCOUNT_VERIFY,
  ADD_NEW_PASSWORD,
  MAIN_STACK,
  PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
} from '../routeName/routeName';
import { useTranslation } from 'react-i18next';
import LeftArrow from '../../assets/svg/arrow-left.svg'
import { TouchableOpacity } from 'react-native';
import { rs } from '../../utils/styles/responsiveSize';

const ShowAlways = () => {
  const {colors} = useTheme();
  const {user} = useSelector(state => state.loginUserReducer);
  const {t:trans}=useTranslation();
  const style=styles(colors);
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 400,
        headerLeft: () => (
          <TouchableOpacity style={style.navigation} onPress={() => navigation.goBack()}>
            <LeftArrow height={rs(24)} width={rs(24)}/>
          </TouchableOpacity>
        ),
      }}>
      {user !== null ? (
        <Stack.Group>
          <Stack.Screen name={MAIN_STACK} component={MainStack} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{...screenOptions(colors)}}>
          <Stack.Screen
            name={SIGN_IN}
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen name={RESET_PASSWORD} component={ResetPassword} options={{title: trans('Reset Password')}} />
          <Stack.Screen
            name={ADD_NEW_PASSWORD}
            component={AddNewPassword}
            options={{title: trans('Reset Password')}}
          />
          <Stack.Screen
            name={PASSWORD_CHANGE_SUCCESS}
            component={PasswordChangeSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ACCOUNT_VERIFY}
            component={VerifyAccount}
            options={{title: trans('Reset Password')}}
          />
          <Stack.Group>
            <Stack.Screen
              name={SIGN_UP}
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default ShowAlways;
