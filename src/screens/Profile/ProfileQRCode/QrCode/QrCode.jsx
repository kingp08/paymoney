import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {rs} from '../../../../utils/styles/responsiveSize';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import config from '../../../../../config';
import {getInfo} from '../../../../features/auth/login/loginApi';
import {useSelector} from 'react-redux';
import Loader from '../../../../utils/Loader/Loader';
import ErrorAlert from '../../../../assets/svg/alert.svg';
import {profileQRCodeStyle} from '../profileQRCode.style';
const QrCode = () => {
  const {colors} = useTheme();
  const styles = profileQRCodeStyle(colors);
  const {t: trans} = useTranslation();
  const [secretCode, setSecretCode] = useState('');
  const [qrLoading, setQrLoading] = useState(false);
  const [error, setError] = useState(false);
  const {user: {token} = {}} =
    useSelector(state => state.loginUserReducer) || {};
  useEffect(() => {
    async function getQrCode() {
      setQrLoading(true);
      const URL = `${config.BASE_URL_VERSION}/qr-code/get-qr-code`;
      const response = await getInfo(token, URL);
      if (response) {
        setQrLoading(false);
        if (response?.response?.status?.code === 200) {
          setQrLoading(false);
          setError(false);
          setSecretCode(response?.response?.records?.secret);
        } else {
          setError(true);
          setQrLoading(false);
        }
      }
    }
    getQrCode();
  }, []);
  const updateQrCode = async () => {
    setQrLoading(true);
    const URL = `${config.BASE_URL_VERSION}/qr-code/add-update-qr-code`;
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
    if (response) {
      setQrLoading(false);
      if (response?.response?.status?.code === 200) {
        setQrLoading(false);
        setError(false);
        setSecretCode(response?.response?.records?.secret);
      } else {
        setError(true);
        setQrLoading(false);
      }
    }
  };
  return (
    <View style={styles.qrContainer}>
      <Text style={styles.description}>
        {trans('Use the QR code to easily handle your transactions')}
      </Text>
      {error && !qrLoading ? (
        <View style={styles.alertCont}>
          <ErrorAlert height={rs(45)} width={rs(52)} />
          <Text style={styles.alertText}>
            {trans('Unable to load QR Code. Please update again.')}
          </Text>
        </View>
      ) : (
        <View style={styles.qrCodeCont}>
          {!error && qrLoading ? (
            <Loader
              source={require('../../../../assets/lottie/loader.json')}
              size={styles.loaderStyle}
              color={colors.cornflowerBlue}
            />
          ) : (
            secretCode && (
              <Image
                style={styles.qrCode}
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?data=${secretCode}&amp;size=${
                    rs(158) * rs(158)
                  }`,
                }}
                alt={trans('Qr Code')}
              />
            )
          )}
        </View>
      )}
      <Pressable onPress={updateQrCode}>
        <Text style={styles.updateScanText}>
          {error ? trans('Add Qr Code') : trans('Update Qr Code')}
        </Text>
      </Pressable>
    </View>
  );
};

export default QrCode;
