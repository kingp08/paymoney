import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useContext, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import MyStatusBar from '../../../../utils/MyStatusBar/MyStatusBar';
import {
  HOME,
  MONEY_REQUEST_TRANSACTIONS_DETAILS,
} from '../../../../navigation/routeName/routeName';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {useEffect} from 'react';
import {successMoneyRequestStyle} from './successMoneyRequest.style';
import {useTranslation} from 'react-i18next';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import config from '../../../../../config';
import { rs } from '../../../../utils/styles/responsiveSize';
import Loader from '../../../../utils/Loader/Loader';
const SuccessMoneyRequest = ({
  route: {
    params: {data: {amount, currency, receiverName, id, email} = {}} = {},
  } = {},
  navigation,
}) => {
  const ref = useRef();
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const [loading, setLoading] = useState(false);
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {isConnected} = useContext(NetworkContext);
  let controlBackHandler;
  useEffect(() => {
    controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }, []);
  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);
  const handleView = async () => {
    setLoading(true);
    if (isConnected) {
      const URL = `${config.BASE_URL_VERSION}/transaction/details`;
      const data = {tr_id: id};
      const res = await postInfo(data, URL, token, 'POST');
      if (res) {
        if (res?.response?.status?.code === 200) {
          navigation.navigate(MONEY_REQUEST_TRANSACTIONS_DETAILS, {
            data: res?.response?.records,
          });
          controlBackHandler?.remove();
        } else {
          setLoading(false);
          handleToaster(trans(res?.response?.status?.message), 'warning', colors);
        }
      }
    }
  };
  const handleBackToHome = () => {
    navigation.navigate(HOME);
    controlBackHandler?.remove();
  };
  const styles = successMoneyRequestStyle(colors);
  return (
    <>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={styles.container}>
        <View style={styles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.success}>{trans('Success')}!</Text>
        <Text style={styles.description}>
          {trans('You have successfully requested')}{' '}
          <Text style={styles.amountText}>
            {amount} {currency}{' '}
          </Text>
          {trans('to')} {receiverName} ({email})
        </Text>
        <Text style={styles.description}>
          {trans('Please wait for response from the recipient')}
        </Text>
        <CustomButton
          title={
            loading ? (
              <View>
                <Loader
                  source={require('../../../../assets/lottie/loader.json')}
                  size={{width: rs(65), height: rs(55)}}
                  color={colors.white}
                />
              </View>
            ) : (
              trans('View Details')
            )
          }
          onPress={!loading ? handleView : null}
          bgColor={colors.cornflowerBlue}
          style={styles.customButton}
          color={colors.white}
        />
        <TouchableOpacity onPress={handleBackToHome}>
          <Text style={styles.backHomeBtn}>{trans('Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SuccessMoneyRequest;
