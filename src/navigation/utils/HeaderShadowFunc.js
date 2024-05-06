import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const HeaderShadowFunc = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return routeName !== 'Home' ? true : false;
};

export default HeaderShadowFunc;
