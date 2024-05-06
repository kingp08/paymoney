import {View, KeyboardAvoidingView, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import WebView from 'react-native-webview';
import {ConfirmPaypalStyle} from './ConfirmPaypalStyle';
import {useTheme} from '@react-navigation/native';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import config from '../../../../../config';
import {getAllTransactions} from '../../../../features/slices/transactions/transactions';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {DEPOSIT_SUCCESS} from '../../../../navigation/routeName/routeName';
import PaypalIcon from '../../../../assets/svg/paypal-icon.svg';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {useTranslation} from 'react-i18next';
import {depositUsingStripeStyle} from '../Stripe/depositUsingStripe.style';
import {getProfileSummary} from '../../../../features/slices/user/getProfile/getProfile';
import { getMyWallets } from '../../../../features/slices/myWallets/myWallets';
const base64 = require('base-64');
const URL = `${config.BASE_URL_VERSION}/deposit-money/payment-confirm`;
const PAYPAL_SANDBOX_URL = `${config.PAYPAL_SANDBOX_URL}`;
const PAYPAL_LIVE_URL = `${config.PAYPAL_LIVE_URL}`;
const Paypal_Info_Url = `${config.BASE_URL_VERSION}/deposit-money/get-paypal-info`;

const ConfirmPaypal = ({
  navigation,
  route: {
    params: {
      currency_Id,
      data,
      setDepositInfo,
      initialState,
      setAmount,
      setError,
      errorText,
    },
  },
}) => {
  const {colors} = useTheme();
  const [accessToken, setAccessToken] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, SetPaymentStatus] = useState(null);
  const [permissionPaypal, setPermissionPaypal] = useState(false);
  const [paypalInfo, setPaypalInfo] = useState({});
  const [isCustomLoader, setIsCustomLoader] = useState(true);
  const [paypalBaseUrl, setPaypalBaseUrl] = useState(null);
  const [load, SetLoad] = useState(false);
  const style = ConfirmPaypalStyle(colors);
  const styles = depositUsingStripeStyle(colors);
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();

  const redirect_url = `${config.BASE_URL_VERSION}`.replace('/api/v2', '');

  useEffect(() => {
    async function checkPaypalInfo() {
      const data = await postInfo(currency_Id, Paypal_Info_Url, token, 'POST');
      setPaypalInfo(data.response.records);
    }
    checkPaypalInfo();
  }, []);

  useEffect(()=>{
    if(paypalInfo.mode){
      handlePaypalApproval();
    }
  },[paypalInfo])

  useEffect(()=>{
    approvalUrl &&
      setPermissionPaypal(true);
  },[approvalUrl])

  const handlePaypalApproval = ()=>{
    let PAYPAL_BASE_URL =
    paypalInfo.mode == 'live' ? PAYPAL_LIVE_URL : PAYPAL_SANDBOX_URL;

    const PaypalAuthUrl = `${PAYPAL_BASE_URL}/v1/oauth2/token`;

    const PaypalOrderUrl = `${PAYPAL_BASE_URL}/v2/checkout/orders`;
    PAYPAL_BASE_URL && setPaypalBaseUrl(PAYPAL_BASE_URL);
    const dataDetail = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: data.currency.code,
            value: data.paypal_amount,
          },
        },
      ],
      application_context: {
        return_url: `${redirect_url}/return`,
        cancel_url: `${redirect_url}/cancel`,
      },
    };

    fetch(PaypalAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64.encode(
          `${paypalInfo.client_id}:${paypalInfo.client_secret}`,
        )}`,
      },
      body: 'grant_type=client_credentials',
    })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          setAccessToken(data.access_token);
          fetch(PaypalOrderUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.access_token}`,
            },
            body: JSON.stringify(dataDetail),
          })
            .then(response => response.json())
            .then(data => {
              const {id, links} = data;
              const approvalUrl = links.find(
                data => data.rel == 'approve',
              ).href;
              setPaymentId(id);
              setApprovalUrl(approvalUrl);
            })
            .catch(error => {});
        } else {
          handleToaster(
            trans('Something is wrong. Please try again later.'),
            'warning',
            colors,
          );
         setIsCustomLoader(false);
        }
      })

      .catch(error => {});
  }

  async function checkDepositConfirmation(confirmingData) {
    const res = await postInfo(confirmingData, URL, token, 'POST');
    const {status} = res.response;
    if (status.code === 200) {
      dispatch(getAllTransactions({token}));
      navigation.navigate(DEPOSIT_SUCCESS, {
        currency: data.currency.code,
        amount: data.formatted_amount,
        setDepositInfo,
        initialState,
        setAmount,
        setError,
        errorText,
      });
      dispatch(getProfileSummary({token}));
      dispatch(getMyWallets({token}));
    } else {
      handleToaster(trans(status.message), 'warning', colors);
    }
  }

  const depositConfirmPaypal = status => {
    const confirmingData = {
      gateway: data.payment_method.name,
      currency_id: data.currency.id,
      amount: data.amount,
      payment_method_id: data.payment_method.id,
      total_amount: data.totalAmount,
      details: {
        status: status,
      },
    };
    checkDepositConfirmation(confirmingData);
  };

  const onNavigationStateChange = (webViewState) => {
    if (webViewState.url.includes(`${redirect_url}`)) {
      SetLoad(false);
      setApprovalUrl(null);
      fetch(`${paypalBaseUrl}/v2/checkout/orders/${paymentId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'COMPLETED') {
            SetPaymentStatus(data.status);
            depositConfirmPaypal(data.status);
          }
        })
        .catch(error => {
          handleToaster(
            trans('Something is wrong. Please try again later.'),
            'warning',
            colors,
          );
        });
    }
  };

  return (
    <KeyboardAvoidingView style={style.keyboardAvoidingView}>
      {(!load || paymentStatus) && (
        <View style={style.container}>
         <View>
            {isCustomLoader &&  
             <View style={style.activeIndicator}>
                <ActivityIndicator size="small" color="#fff"/>
             </View>
             }
          <CustomButton
            title={<PaypalIcon fill={colors.textQuinary} /> }
            bgColor={'#FFAF30'}
            style={styles.processButton}
            color={colors.white}
          />
        </View>
        </View>
      )}
      {approvalUrl && !paymentStatus && permissionPaypal && (
        <WebView
          onLoadStart={() => SetLoad(true)}
          style={style.webView}
          source={{uri: approvalUrl}}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ConfirmPaypal;
