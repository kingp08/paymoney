import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import Copy from '../../assets/svg/copy.svg';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import {HOME} from '../../navigation/routeName/routeName';
import {Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {receivedCrypto} from './receivedCrypto,style';
import {getInfo} from '../../features/auth/login/loginApi';
import config from '../../../config';
import {rs} from '../../utils/styles/responsiveSize';
import Loader from '../../utils/Loader/Loader';
import ErrorAlert from '../../assets/svg/alert.svg';


const ReceivedCrypto = ({navigation, route}) => {
  const {code = '', typeID='', provider} = route?.params?.currency || {};
  const token =
    useSelector(state => state.loginUserReducer?.user?.token || '') || {};
  const {colors} = useTheme();
  const {t: trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const styles = receivedCrypto(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const copyToClipboard = text => {
    Clipboard.setString(text);
    handleToaster(trans('Copied to clipboard.'), 'copied', colors);
  };
  const getAddress = async () => {
    let URL;
    if(provider == 'tatumio') {
      URL = `${config.BASE_URL_VERSION}/crypto/send/tatumio/user-address/${code}`;
    } else {
      URL = `${config.BASE_URL_VERSION}/crypto/send/blockio/${code}/${typeID}`;
    }
    const result = await getInfo(token, URL);
    if (result) {
      const {records, status} = result?.response || {};
      setLoading(false);
      setRefreshing(false);
      status?.code === 200
        ? (setAddress(records?.senderAddress), setError(''))
        : (handleToaster(trans(status?.message, 'error', colors)),
          setError(status?.message));
    }
  };
  useEffect(() => {
    let isMounted = false;
    if (!isMounted && isConnected && code && !loading) {
      setLoading(true);
      getAddress();
      return;
    }
    setError(trans('No Internet'));
    return () => (isMounted = true);
  }, [code]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAddress();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll_view}
      keyboardShouldPersistTaps={'always'}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        {error && !loading ? (
          <View style={styles.alertCont}>
            <ErrorAlert height={rs(45)} width={rs(52)} />
            <Text style={styles.alertText}>
              {trans('Unable to load QR Code. Please refresh.')}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.qrCont}>
              {!error && loading ? (
                <Loader
                  source={require('../../assets/lottie/loader.json')}
                  size={styles.loaderStyle}
                  color={colors.cornflowerBlue}
                />
              ) : (
                address && (
                  <Image
                    style={styles.qrImg}
                    source={{
                      uri: `https://api.qrserver.com/v1/create-qr-code/?data=${address}&amp;size=${rs(158)*rs(158)}`,
                    }}
                    alt={trans('Qr Code')}
                  />
                )
              )}
            </View>
            <Text style={styles.receivedText}>
              {trans('Receiving {{x}} Address', {x: code})}
            </Text>
            {address && !error && !loading && (
              <Text style={styles.address}>{address}</Text>
            )}
            <CustomButton
              title={trans('Copy Address')}
              icon={<Copy fill={'#FFFFFF'} />}
              bgColor={colors.cornflowerBlue}
              style={styles.sendAgainBtn}
              onPress={() => copyToClipboard(address)}
              color={colors.white}
              disabled={error || loading ? true : false}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(HOME);
              }}>
              <Text style={styles.backToHome}>{trans('Back to Home')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ReceivedCrypto;
