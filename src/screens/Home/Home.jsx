import {MY_WALLET} from '../../navigation/routeName/routeName';
import {
  View,
  StatusBar,
  BackHandler,
  Modal,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {PROFILE} from '../../navigation/routeName/routeName';
import {useIsFocused, useTheme} from '@react-navigation/native';
import MyProfile from '../components/MyProfile/MyProfile';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import RightArrow from '../../assets/svg/angleRightArrow.svg';
import LeftIcon from '../../assets/svg/wallet.svg';
import CheckWallets from '../components/CheckWallets/CheckWallets';
import AllActionCards from './AllActionCards/AllActionCards';
import {rs} from '../../utils/styles/responsiveSize';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getMyWallets} from '../../features/slices/myWallets/myWallets';
import {useRef} from 'react';
import {useCallback} from 'react';
import {handleLogOut} from '../utilities/handleLogout/handleLogout';
import {useState} from 'react';
import {withdrawSettingsStyle} from '../Withdraw/WithdrawSettings/WithdrawSettings.style';
import {modalBottomSheetStyle} from '../components/components/Modals/ModalBottomSheet/modalBottomSheet.style';
import ButtonOutline from '../components/Buttons/ButtonOutline/ButtonOutline';
import {homeStyle} from './home.style';
import config from '../../../config';
import { getWithdrawalMethods } from '../../features/slices/getMethods/getAddWithdrawalMethods';
import { getPreferences } from '../../features/slices/preference/systemPreference';

const Home = ({navigation}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const isNavigate = useRef('');
  const isFocused = useIsFocused();
  const [closeModal, setCloseModal] = useState(false);
  const dispatch = useDispatch();
  const withdrawSettingStyle = withdrawSettingsStyle(colors);
  const bsExtraStyle = modalBottomSheetStyle(colors);
  const {container, actionsCont, background, headerBackground} = homeStyle(
    colors,
    closeModal,
  );

  const {
    user: {first_name, last_name, token, picture},
  } = useSelector(state => state.loginUserReducer);
  useEffect(() => {
    const url = `${config.BASE_URL_VERSION}/withdrawal-setting/payment-methods`;
    dispatch(getWithdrawalMethods({token, url}));
    dispatch(getMyWallets({token}));
    dispatch(getPreferences({token}));
  }, [dispatch]);
  const handleNavigation = useCallback(route => {
    if (!isNavigate.current) {
      isNavigate.current = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate.current = '';
      }, 1000);
    }
  }, []);

  const handleBackButtonPress = () => {
    if (isFocused) {
      setCloseModal(true);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );
    return () => backHandler?.remove();
  }, [isFocused]);

  const CloseApp = () => {
    setCloseModal(false);
    BackHandler.exitApp();
    handleLogOut(dispatch);
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={background}
        showsVerticalScrollIndicator={false}>
        <View style={container}>
          <MyProfile
            name={first_name?.concat(' ', last_name)}
            home={1}
            onPress={() => {
              handleNavigation(PROFILE);
            }}
            leftImage={
              <ProfileImage
                imageURL={picture}
                imageSize={rs(68)}
                onPress={() => {
                  handleNavigation(PROFILE);
                }}
              />
            }
            buttonTitle={trans('View Profile')}
          />
          <CheckWallets
            headerText={trans('Check Your')}
            mainText={trans('Wallets Balance')}
            leftIcon={<LeftIcon />}
            rightIcon={<RightArrow fill={colors.white} />}
            onPress={() => {
              handleNavigation(MY_WALLET);
            }}
          />
          <AllActionCards
            style={actionsCont}
            navigation={navigation}
            isNavigate={isNavigate}
            colors={colors}
          />
        </View>
        <View style={withdrawSettingStyle.centeredView}>
          <Modal animationType="fade" transparent={true} visible={closeModal}>
            <View style={withdrawSettingStyle.centeredView}>
              <View style={withdrawSettingStyle.modalView}>
                <Text style={bsExtraStyle.deleteConfirmationText}>
                  {trans('Close App?')}
                </Text>
                <View>
                  <View style={bsExtraStyle.btnCont}>
                    <ButtonOutline
                      style={bsExtraStyle.btnCancel}
                      title={trans('Cancel')}
                      onPress={() => {
                        setCloseModal(false);
                      }}
                    />
                    <ButtonOutline
                      style={bsExtraStyle.btnDelete}
                      title={trans('Ok')}
                      onPress={CloseApp}
                      bgColor={colors.sunshade}
                      borderColor={colors.sunshade}
                      color={colors.gunPowder}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={headerBackground}></View>
      </ScrollView>
    </>
  );
};

export default Home;
