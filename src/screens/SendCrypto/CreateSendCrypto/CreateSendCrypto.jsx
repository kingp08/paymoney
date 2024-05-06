import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Keyboard} from 'react-native';
import {Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moneyRequestStyle} from '../../RequestMoney/Create/CreateRequest/createRequest.style';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import Scan from '../../../assets/svg/scan.svg';
import {rs} from '../../../utils/styles/responsiveSize';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {
  CONFIRM_SEND_CRYPTO,
  CREATE_SEND_CRYPTO,
  HOME,
  SCAN_QR_CODE,
} from '../../../navigation/routeName/routeName';
import {debounceValidation} from '../../utilities/Validation/Validation';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPreference} from '../../../features/slices/preferenceSlice/preferenceSlice';
import PriorityBottomSheet from './BottomSheet/PriorityBottomSheet';
import {memo} from 'react';
import config from '../../../../config';
import {getInfo} from '../../../features/auth/login/loginApi';
import { useContext } from 'react';
import { NetworkContext } from '../../../utils/Network/NetworkProvider';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';

const CreateSendCrypto = ({navigation, route}) => {
  const {code, id, type, typeID, provider} = route?.params?.currency || {};
  const {isConnected} = useContext(NetworkContext);
  const {t: trans} = useTranslation();
  const data = route?.params?.data || '';
  const priorityElements = [{name: trans('Low')}, {name: trans('Medium')}, {name: trans('High')}];
  const initialState = {
    recipientAddress: '',
    priority: priorityElements[0]?.name,
    code: code,
    id: id,
    type: type,
    senderAddress:'',
    typeID:typeID,
    provider: provider
  };
  const errorState = {
    recipientAddress: false,
    priority: false,
    code: false,
  };
  const {colors} = useTheme();
  const styles = moneyRequestStyle(colors);
  const priorityBottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const count = useRef(8);
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {preference} = useSelector(state => state.preference) || {};
  const {decimal_format_amount_crypto = '8'} = preference || {};
  const [isFastLoad, setIsFastLoad] = useState(true);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [formData, setFormData] = useState(initialState);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(errorState);
  const [amountError, setAmountError]=useState('')
  const [amountCheck, setAmountCheck]=useState(false);
  const [networkFee, setNetworkFee]=useState('');

  const handleError = () => {
    const {recipientAddress, priority} = formData;
    setError({
      recipientAddress: recipientAddress === '',
      priority: priority === '',
      amount: amount === '',
    });
  };

  const handleOnChange = (value, name) => {
    setFormData(prevFormData => ({...prevFormData, [name]: value}));
    if (name === 'priority') {
      networkFree({
        address: formData.recipientAddress,
        amount: amount,
        priority: value,
        errorAddress: addressError
      });
    }
  };

  const handlePriorityBottomSheet = () => {
    Keyboard.dismiss();
    priorityBottomSheetRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    const fastLoadTimeout = setTimeout(() => {
      setIsFastLoad(false);
    }, 0);
    const openBottomSheetTimeout = setTimeout(() => {
      setOpenBottomSheet(true);
    }, 300);
    return () => {
      clearTimeout(fastLoadTimeout);
      clearTimeout(openBottomSheetTimeout);
    };
  }, []);

  const getAddress = async () => {
    let URL = "";
    if(formData.provider == 'tatumio') {
      URL = `${config.BASE_URL_VERSION}/crypto/send/tatumio/user-address/${formData?.code}`;
    } else {
      URL = `${config.BASE_URL_VERSION}/crypto/send/blockio/${formData?.code}/${formData?.typeID}`;
    }
    const result = await getInfo(token, URL);
    
    const {records, status} = result?.response || {};
    if (status?.code === 200) {
      setFormData({...formData, senderAddress:records?.senderAddress});
    } else {
      handleToaster(trans(status?.message), 'error', colors);
    }
  };
  const networkFree = async({address, amount, checkAddress, priority, errorAddress}) => {
    try {
      if (address.length == 0 || errorAddress.length > 0  || !isConnected) return;
      setAmountCheck(true);
      let URL = "";
      if(formData.provider == 'tatumio') {
        URL = `${config.BASE_URL_VERSION}/crypto/send/tatumio/validate-user-balance?walletCurrencyCode=${formData.code}&amount=${amount}&senderAddress=${formData.senderAddress}&receiverAddress=${address}&priority=${priorityFormat(priority)}`
      } else {
        URL = `${config.BASE_URL_VERSION}/crypto/send/blockio/validate-user-balance?walletCurrencyCode=${formData.code}&amount=${amount}&senderAddress=${formData.senderAddress}&receiverAddress=${address}&priority=${priority?.toLowerCase()}`
      }
      const result = await getInfo(token, URL);
      const { status, records } = result?.response || {};

      if(status?.code === 200) {
        setAmountError('');
        if(formData.provider == 'tatumio') {
          setNetworkFee(records['networkFee']);
        } else {
          setNetworkFee(records['network-fee']);
        }
      } else {
        setAmountError(trans(status?.message));
      }
    } catch(error) {
      handleError(trans(error.message), 'error', colors);
    } finally {
      setAmountCheck(false);
    }
  };

  const doMatchAddress = async (value) => {
    try {
      if (!value || !isConnected) return;
      let URL = "";
      if(formData.provider == 'tatumio') {
        URL = `${config.BASE_URL_VERSION}/crypto/send/tatumio/validate-address?receiverAddress=${value}&walletCurrencyCode=${formData?.code}`;
      } else {
        URL = `${config.BASE_URL_VERSION}/crypto/send/blockio/validate-address?receiverAddress=${value}&walletCurrencyCode=${formData?.code}`;
      }
      setCheckAddress(true);
      const result = await getInfo(token, URL);
      if (!result) return;
      const { status } = result?.response || {};
      const text = status?.message?.split(formData?.code);
      const message = text?.length === 1 ? text[0] : trans(text[0]) + formData?.code + trans(text[1]);
      if(status?.code === 200) {
        networkFree({ address: value, amount, priority: formData.priority, errorAddress: '' });
        setAddressError('')
      } else setAddressError(trans(message))
    } catch (error) {
      handleError(trans(error.message), 'error', colors);
    } finally {
      setCheckAddress(false);
    }
  };
  
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getAllPreference({token}));
      getAddress();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if(data){
      setFormData({...formData, recipientAddress:data});
      doMatchAddress(data)
    }
  }, [data]);

  useEffect(() => {
      setAmountCheck(true);
      let timeoutId;
      const handler = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          networkFree({address:formData.recipientAddress, amount:amount, priority:formData.priority, errorAddress:addressError,checkAddress});
        }, 500);
      };
      handler();
      return () => clearTimeout(timeoutId);
   
  }, [amount]);

  useEffect(() => {
    let timeoutId;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        doMatchAddress(formData.recipientAddress)
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [formData.recipientAddress]);

  if (isFastLoad) {
    return <View style={styles.scroll_view} />;
  }

  const handleProceed = () => {
    const {recipientAddress, priority} = formData;
    if (!recipientAddress || !priority || !amount || checkAddress || amountCheck || amountError || addressError) {
      handleError();
      return;
    }
    navigation.navigate(CONFIRM_SEND_CRYPTO, {data: {formData, amount, networkFee, setFormData, initialState, setAmount, provider: formData.provider}});
  };
  const handleQRScan = () => {
    navigation.navigate(SCAN_QR_CODE, {
      method: {
        method: trans('Send Crypto'),
        goToScreen: CREATE_SEND_CRYPTO,
      },
    });
  };


  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TransactionStep
                currentPage={trans('{{x}} of {{y}}', {
                  x: 1,
                  y: 2,
                })}
                header={trans('Send {{x}}', {x: formData?.code})}
                presentStep={1}
                totalStep={2}
                description={trans('Enter Recipient Address and Amount')}
                style={styles.transactionStep}
              />
              <View style={styles.email}>
                <CustomInput
                  label={trans('Recipient Address') + '*'}
                  placeholder={trans('Recipient Address')}
                  keyboardAppearance={'dark'}
                  autoCapitalize={'none'}
                  value={formData?.recipientAddress}
                  editable={ data && !addressError ? false : true}
                  rightIcon={
                    <TouchableOpacity
                      onPress={handleQRScan}
                      style={styles.qrButton}
                    >
                      <Scan
                        fill={colors.rightArrow}
                        height={rs(25)}
                        width={rs(25)}
                      />
                    </TouchableOpacity>
                  }
                  onChangeText={value => (
                    setCheckAddress(true),
                    setFormData({...formData, recipientAddress: value})
                    )}
                  isError={(error.recipientAddress && !formData.recipientAddress)|| (addressError && formData.recipientAddress)}
                  style={styles.contentWidth}
                  returnKeyType={'done'}
                  error={
                    (addressError && formData.recipientAddress)? addressError :
                    error.recipientAddress
                      ? trans('This field is required.')
                      : ''
                  }
                />
              </View>
              <View style={styles.mb_16}>
                <CustomInput
                  label={trans('Amount') + '*'}
                  placeholder={parseFloat(0.0).toFixed(
                    decimal_format_amount_crypto,
                  )}
                  keyboardAppearance={'dark'}
                  value={amount}
                  keyboardType={'number-pad'}
                  onChangeText={text => {
                    setAmount(
                      debounceValidation(
                        text,
                        8,
                        decimal_format_amount_crypto,
                        count,
                      ),
                    );
                  }}
                  isError={ (amountError && amount) || 
                    (error.amount && !amount) || (!(amount > 0) && amount)
                  }
                  style={styles.contentWidth}
                  returnKeyType={'done'}
                  error={
                    (amountError && amount)?amountError:
                    !(amount > 0) && amount
                      ? trans('Please enter a valid number.')
                      : error.amount
                      ? trans('This field is required.')
                      : ''
                  }
                  maxLength={Number(count.current)}
                />
              </View>
              <View style={styles.mb_16}>
                <SelectInput
                  label={trans('Priority') + '*'}
                  onPress={() => handlePriorityBottomSheet()}
                  title={formData.priority}
                  style={styles.contentWidth}
                  isError={error.contentWidth && !formData.priority}
                  error={
                    error.contentWidth ? trans('This field is required.') : ''
                  }
                  icon={<RightIcon fill={colors.manatee} />}
                />
              </View>
              <CustomButton
                title={trans('Proceed')}
                onPress={() => handleProceed()}
                bgColor={colors.cornflowerBlue}
                disabled={(checkAddress||amountCheck) ? true : false}
                style={styles.btnWidth}
                color={colors.white}
              />
              <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
                <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      {openBottomSheet && (
        <PriorityBottomSheet
          data={{title: 'Select Priority', value: priorityElements}}
          handleSetInfo={handleOnChange}
          selected={formData.priority}
          bottomSheetRef={priorityBottomSheetRef}
        />
      )}
    </>
  );
};

export default memo(CreateSendCrypto);

export function priorityFormat(priority) {
  switch (priority?.toLowerCase()) {
    case 'low':
      return 'slow';
    case 'medium':
      return 'medium';
    case 'high':
      return 'fast';
    default:
      return;
  }
}
