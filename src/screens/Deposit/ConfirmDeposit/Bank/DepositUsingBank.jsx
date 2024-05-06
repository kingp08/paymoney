import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React from 'react';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {CONFIRM_DEPOSIT_BANK} from '../../../../navigation/routeName/routeName';
import {depositUsingStripeStyle} from '../Stripe/depositUsingStripe.style';
import SelectInput from '../../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../../assets/svg/rightArrow.svg';
import {useState} from 'react';
import {useEffect} from 'react';
import {depositUsingBankStyle} from './depositUsingBank.style';
import {useRef} from 'react';
import DocumentPicker, { types } from 'react-native-document-picker';
import SelectBankBottomSheet from './BottomSheet/SelectBankBottomSheet';
import DepositUsingBankDetails from './Details/DepositUsingBankDeatils';
import CustomDocumentPicker from '../../../components/CustomTextInput/CustomDocumentPicker/CustomDocumentPicker';
import File from '../../../../assets/svg/attach-file.svg';
import {useDispatch, useSelector} from 'react-redux';
import {depositBankLists} from '../../../../features/slices/getBanksList/getDepositBankList';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import {useContext} from 'react';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import config from '../../../../../config';
import {useTranslation} from 'react-i18next';
const bank_list_url = `${config.BASE_URL_VERSION}/deposit-money/get-bank-list`;
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import { handleToaster } from '../../../../utils/CustomAlert/handleAlert';

const DepositUsingBank = ({
  navigation,
  route: {
    params: {
      data,
      setDepositInfo,
      initialState: depositInitialElements = {},
      setAmount = {},
      setError: depositError = {},
      errorText: depositErrorText = {},
    } = {},
  },
}) => {
  const dispatch = useDispatch();
  const {preferenceData} = useSelector(state => state.systemPreference);
  const {t:trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const [supportedFormat, setSupportedFormat] = useState(['jpg', 'jpeg', 'png', 'doc', 'docx', 'pdf'])
  const {bankLists, bankListsLoader} = useSelector(
    state => state.getDepositBankLists,
  );
  const [isSupportedFormat, setIsSupportedFormat] = useState(true);

  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const initialState = {
    bankId: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    attachFile: '',
  };
  const errorText = {
    bankName: false,
    accountName: false,
    accountNumber: false,
    attachFile: false,
    attachFileSize: false,
  };
  const bankBottomSheetRef = useRef(null);
  const openBankBottomSheet = () => {
    Keyboard.dismiss();
    bankBottomSheetRef.current?.snapToIndex(0);
  };
  const [bankInfo, setBankInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const {colors} = useTheme();
  const styles = depositUsingBankStyle(colors);
  const handleError = () => {
    const {bankName, attachFile} = bankInfo;
    const errorAttachFile = attachFile === '' ? true : false;
    const errorBankName = bankName === '' ? true : false;
    setError({
      ...error,
      attachFile: errorAttachFile,
      bankName: errorBankName,
    });
  };
  const handleProceed = () => {
    const {bankName, attachFile} = bankInfo;
    if (bankName && attachFile && isConnected && isSupportedFormat) {
      navigation.navigate(CONFIRM_DEPOSIT_BANK, {
        data: {paymentInfo: data, bankInfo: bankInfo},
        setDepositInfo,
        initialState: depositInitialElements,
        setAmount,
        setError: depositError,
        errorText: depositErrorText,
      });
    } else {
      handleError();
    }
  };
  const handleFileUpload = async () => {
    try {
      const granted=await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result)=>{
        return result;
      });
      if (granted !=RESULTS.DENIED) {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [
              types.images, 
              types.doc,
              types.docx,
              types.pdf,
            ],
          });
          setIsSupportedFormat(supportedFormat.indexOf(res.type.split('/')[1]) > -1);
          if (res.size / 1000000 <= parseInt(preferenceData.file_size)) {
            setBankInfo({...bankInfo, attachFile: res});
            setError({...error, attachFileSize: false});
          } else {
            setError({...error, attachFileSize: true});
            setBankInfo({...bankInfo, attachFile: ''});
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          } else {
          }
        }
      }else{
        handleToaster(
          trans('Please grant storage permission to access your storage and try again.'),
          'error',
          colors,
        );
      }
    } catch (err1) {}
  };
  useEffect(() => {
    async function checkLists(){
      let isMounted = true;
      if (isMounted) {
        const URL = bank_list_url;
        const obj={currency_id: data?.currency?.id};
        const listOfBanks= await dispatch(depositBankLists({data:obj, token, URL}));
        checkBankList(listOfBanks.payload.response.records);
      }
      return () => {
        isMounted = false;
      };
    }
    checkLists();
  }, [dispatch]);

  const checkBankList=(listOfBanks)=>{
    const exits =  listOfBanks.find(bank => bank.is_default === 'Yes');
    if (exits) {
      setBankInfo({
        ...bankInfo,
        bankId: exits?.id,
        bankName: exits?.bank_name,
        accountName: exits?.account_name,
        accountNumber: exits?.account_number,
      });
      return;
    }
    setBankInfo({
      ...bankInfo,
      bankId: listOfBanks[0]?.id,
      bankName: listOfBanks[0]?.bank_name,
      accountName: listOfBanks[0]?.account_name,
      accountNumber: listOfBanks[0]?.account_number,
    });
  }

  return (
    <>
      <KeyboardAvoidingView
        style={depositUsingStripeStyle(colors).onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          style={depositUsingStripeStyle(colors).scroll_view}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <View style={depositUsingStripeStyle(colors).container}>
            <TransactionStep
              currentPage={trans('{{x}} of {{y}}', {
                x: 2,
                y: 3,
              })}
              header={trans('Bank Information')}
              presentStep={2}
              totalStep={3}
              description={trans('Please select your bank account for depositing')}
              style={[
                depositUsingStripeStyle(colors).mb_20,
                depositUsingStripeStyle(colors).transactionStep,
              ]}
            />
            <View style={styles.mb_24}>
              <SelectInput
                label={trans('Bank')}
                onPress={() => openBankBottomSheet()}
                title={bankInfo.bankName}
                style={depositUsingStripeStyle(colors).contentWidth}
                isError={error.bankName && !bankInfo.bankName}
                error={trans('This field is required.')}
                icon={<RightIcon fill={colors.manatee} />}
              />
            </View>
            <View
              style={[
                styles.accountNameCont,
                depositUsingStripeStyle(colors).mb_20,
              ]}>
              <Text style={styles.labelText}>{trans('Account Name')}</Text>
              <Text style={styles.valueText}>{bankInfo.accountName}</Text>
            </View>
            <View style={[styles.bankInfoCont, styles.mb_24]}>
              <View style={styles.accountNumberCont}>
                <Text style={styles.labelText}>{trans('Account Number')}</Text>
                <Text style={styles.valueText}>{bankInfo.accountNumber}</Text>
              </View>
              <View style={styles.bankNameCont}>
                <Text style={styles.labelText}>{trans('Bank Name')}</Text>
                <Text style={styles.valueText}>{bankInfo.bankName}</Text>
              </View>
            </View>
            <View style={styles.mb_24}>
              <CustomDocumentPicker
                label={`${trans('Attach File')}*`}
                onPress={handleFileUpload}
                icon={<File fill={colors.filePrimary} />}
                value={bankInfo.attachFile && [bankInfo.attachFile]}
                info={trans('This value must be less than or equal to 2 MB')}
                style={depositUsingStripeStyle(colors).contentWidth}
                isError={
                  (error.attachFile && !bankInfo.attachFile) ||
                  (error.attachFileSize && !bankInfo.attachFile)||
                  (!isSupportedFormat && bankInfo.attachFile)
                }
                error={
                  error.attachFileSize
                    ? trans('This value must be less than or equal to 2 MB'):
                    !isSupportedFormat && bankInfo.attachFile ?
                    trans('Please select (jpg, jpeg, png, doc, docx, pdf)')
                    : error.attachFile && !bankInfo.attachFile
                    ? trans('This field is required.')
                    : ''
                }
                title={trans('Choose a file')}
              />
            </View>
            <DepositUsingBankDetails
              data={data}
              style={{
                header: styles.header,
              }}
            />
            <CustomButton
              title={trans('Proceed')}
              onPress={handleProceed}
              bgColor={colors.cornflowerBlue}
              style={depositUsingStripeStyle(colors).processButton}
              color={colors.white}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={depositUsingStripeStyle(colors).cancelBtn}>
                {trans('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {bankLists.length > 0 && (
        <SelectBankBottomSheet
          bottomSheetRef={bankBottomSheetRef}
          setSelectedItem={setBankInfo}
          selectedItem={bankInfo}
          data={bankLists}
        />
      )}
      {bankListsLoader && <CustomLoader />}
    </>
  );
};

export default DepositUsingBank;
