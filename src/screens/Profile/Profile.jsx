import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import InfoComponent from './infoComponent/InfoComponent';
import {useTheme} from '@react-navigation/native';
import {profileStyle} from './profileStyle';
import ProfileCard from './ProfileCard/ProfileCard';
import MyProfile from '../components/MyProfile/MyProfile';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import {rs} from '../../utils/styles/responsiveSize';
import {EDIT_PROFILE} from '../../navigation/routeName/routeName';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileSummary} from '../../features/slices/user/getProfile/getProfile';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import Loader from '../../utils/Loader/Loader';
import ProfileQrButton from './ProfileQrButton/ProfileQrButton';
const Profile = ({navigation}) => {
  const {colors} = useTheme();
  const styles = profileStyle(colors);
  const dispatch = useDispatch();
  const {
    user: {first_name, last_name, email, token, picture},
  } = useSelector(state => state.loginUserReducer);
  const {userInfo, loading} = useSelector(state => state.profileReducer) || {};
  const {
    address,
    city,
    timezone,
    country_id,
    state,
    wallets,
    countries,
    last_30_days_transaction,
    formattedPhone,
  } = userInfo;
  useEffect(() => {
    async function fetchData() {
      let isMounted = true;
      if (isMounted && Object.keys(userInfo)?.length === 0) {
        dispatch(getProfileSummary({token}));
      }
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  }, [dispatch]);
  const {t:trans} = useTranslation();
  const memorizedWallet = useCallback(() => {
    const exitWallet = wallets?.find(curr => curr.is_default === 'Yes');
    return exitWallet?.currency?.code;
  }, [wallets]);
  const memorizedCountry = useCallback(() => {
    const exitCountries = countries?.find(
      curr => curr?.id === Number(country_id),
    );
    return exitCountries?.name;
  }, [country_id]);
  const [fastLoad, setFastLoad] = useState(true);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View style={styles.scroll_view} />;
  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        style={styles.scroll_view}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}>
        <View style={styles.container}>
          <MyProfile
            name={first_name?.concat(' ', last_name)}
            rightImage={
              <ProfileImage
                imageURL={picture}
                badgeIconBg={colors.cornflowerBlue}
                badgeIconBgSize={rs(21)}
                defaultColor={colors.green}
                imageSize={rs(68)}
                borderColor={colors.currencyIcon}
                onPress={() => navigation.navigate(EDIT_PROFILE)}
              />
            }
            email={email}
            onPress={() => navigation.navigate(EDIT_PROFILE)}
            buttonTitle={trans('Edit Profile')}
          />
          <ProfileQrButton/>
          {loading ? (
            <View style={styles.loading}>
             <Loader
               source={require('../../assets/lottie/loader.json')}
               size={{height:rs(60), width:rs(70)}}
               color={colors.textTertiaryVariant}
             />
         </View>
          ) : (
            <>
              <View style={styles.profileCardsComponent}>
                <ProfileCard
                  text={trans('Number of Wallets')}
                  value={wallets?.length}
                  valueColor={'wallets'}
                  bgColor={'wallets'}
                />
                <ProfileCard
                  text={trans('Number of Transactions')}
                  value={last_30_days_transaction}
                  lastUse={trans('Last 30 days')}
                  valueColor={'transactions'}
                  bgColor={'transactions'}
                />
              </View>
              <InfoComponent
                info={trans('Phone')}
                infoText={formattedPhone}></InfoComponent>
              <InfoComponent info={trans('Address')} infoText={address} />
              <InfoComponent info={trans('City')} infoText={city} />
              <InfoComponent info={trans('State')} infoText={state} />
              <InfoComponent
                info={trans('Country')}
                infoText={memorizedCountry()}
              />
              <InfoComponent info={trans('Timezone')} infoText={timezone} />
              <InfoComponent
                info={trans('Default Wallet')}
                infoText={memorizedWallet()}
                lastElement={1}
              />
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
