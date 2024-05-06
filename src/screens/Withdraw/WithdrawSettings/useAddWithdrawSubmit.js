import {useTheme} from '@react-navigation/native';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import config from '../../../../config';
import {postInfo} from '../../../features/auth/login/loginApi';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import useHandleAdd from './HandleAdd';

const useAddWithdrawSubmit = (
  setError,
  error,
  withdrawOptionPaypal,
  withdrawOptionBank,
  withdrawOptionCrypto,
  selectedMethod,
  validEmail,
  setLoading,
  selectedCountry,
  setWithdrawMethod,
  setWithdrawCurrency,
  cryptoError
) => {
  const {isConnected} = useContext(NetworkContext);
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const [handleAddMethodStat] = useHandleAdd({
    setLoading: setLoading,
    setWithdrawMethod,
    setWithdrawCurrency,
  });
  const handleError = () => {
    const {email} = withdrawOptionPaypal;
    const {
      account_holders_name,
      account_number,
      swift_code,
      bank_name,
      branch_name,
      branch_city,
      branch_address,
      country,
    } = withdrawOptionBank;
    const {code, crypto_address} = withdrawOptionCrypto;
    const errorEmail = email === '' ? true : false;
    const errorAccountName = account_holders_name === '' ? true : false;
    const errorAccountNumber = account_number === '' ? true : false;
    const errorSwiftCode = swift_code === '' ? true : false;
    const errorBankName = bank_name === '' ? true : false;
    const errorBranchName = branch_name === '' ? true : false;
    const errorBranchCity = branch_city === '' ? true : false;
    const errorBranchAddress = branch_address === '' ? true : false;
    const errorCountry = selectedCountry === '' || 'undefined' ? true : false;
    const errorCode = code === '' ? true : false;
    const errorCryptoAddress = crypto_address === '' ? true : false;
    setError({
      ...error,
      email: errorEmail,
      account_holders_name: errorAccountName,
      account_number: errorAccountNumber,
      swift_code: errorSwiftCode,
      bank_name: errorBankName,
      branch_name: errorBranchName,
      branch_city: errorBranchCity,
      branch_address: errorBranchAddress,
      country: errorCountry,
      code: errorCode,
      crypto_address: errorCryptoAddress,
    });
  };

  const HandleSubmit = async () => {
    if (isConnected) {
      if (!selectedMethod?.name) {
        handleToaster(trans('Please Select a method first!'), 'warning', colors);
      }
      const {valid_account_holders_name,
        valid_account_number,
        valid_swift_code,
        valid_bank_name,
        valid_branch_name,
        valid_branch_city,
        }=error
      const {email} = withdrawOptionPaypal;
      const {
        account_holders_name,
        account_number,
        swift_code,
        bank_name,
        branch_name,
        branch_city,
        branch_address,
      } = withdrawOptionBank;
      const {code, crypto_address} = withdrawOptionCrypto;
      if (selectedMethod?.name === 'Paypal') {
        if (email && validEmail) {
          setLoading(true);
          const paypalData = {
            ...withdrawOptionPaypal,
            payment_method: selectedMethod?.name,
          };
          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const res = await postInfo(paypalData, URL, token, 'POST');
          const {records, status} = res.response;

          handleAddMethodStat(records, status);
        } else {
          setLoading(false);
          handleError();
        }
      } else if (selectedMethod?.name === 'Bank') {
        if (
          account_holders_name &&
          account_number &&
          swift_code &&
          bank_name &&
          branch_name &&
          branch_city &&
          branch_address &&
          selectedCountry && valid_account_holders_name &&
          valid_account_number &&
          valid_swift_code &&
          valid_bank_name && 
          valid_branch_city &&
          valid_branch_name
        ) {
          setLoading(true);
          const bankData = {
            payment_method: selectedMethod?.name,
            account_name: account_holders_name,
            account_number: account_number,
            swift_code: swift_code,
            bank_name: bank_name,
            bank_branch_name: branch_name,
            bank_branch_city: branch_city,
            bank_branch_address: branch_address,
            country: selectedCountry.id,
          };

          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const res = await postInfo(bankData, URL, token, 'POST');
          const {records, status} = res.response;
          handleAddMethodStat(records, status);
        } else {
          setLoading(false);
          handleError();
        }
      } else if (selectedMethod?.name === 'Crypto') {
        if (crypto_address && code && !cryptoError) {
          setLoading(true);
          const cryptoData = {
            currency_id: withdrawOptionCrypto.id,
            crypto_address: withdrawOptionCrypto.crypto_address,
            payment_method: selectedMethod?.name,
          };
          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const res = await postInfo(cryptoData, URL, token, 'POST');
          const {records, status} = res.response;
          handleAddMethodStat(records, status);
        } else {
          setLoading(false);
          handleError();
        }
      }
    }
  };
  return [HandleSubmit];
};

export default useAddWithdrawSubmit;
