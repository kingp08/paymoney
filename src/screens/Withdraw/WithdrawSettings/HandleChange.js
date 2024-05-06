import {
  cryptoAddressValidation,
  validateEmail,
} from '../../utilities/Validation/Validation';

const HandleChange = (
  {setError,
  error,
  setWithdrawOptionPaypal,
  withdrawOptionPaypal,
  setValidEmail,
  setWithdrawOptionBank,
  setWithdrawOptionCrypto,
  withdrawOptionCrypto,
  selectedMethod,
  setCryptoError,}
) => {
  const useHandleChange = (value, name) => {
    if (selectedMethod?.name === 'Paypal') {
      if (name === 'email') {
        if (validateEmail(value)) {
          setWithdrawOptionPaypal({...withdrawOptionPaypal, [name]: value});
          setError({...error, email: false});
          setValidEmail(true);
        } else {
          setWithdrawOptionPaypal({...withdrawOptionPaypal, [name]: value});
          setError({...error, email: true});
          setValidEmail(false);
        }
      }
    } else if (selectedMethod?.name === 'Bank') {
      setWithdrawOptionBank((prevState)=>({...prevState, [name]:value}));
    } else if (selectedMethod?.name === 'Crypto') {
      if (name === 'crypto_address' && !withdrawOptionCrypto.code) {
        setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
        setError({...error, crypto_address: false});
      } else if (name === 'crypto_address' && withdrawOptionCrypto.code) {
        if (cryptoAddressValidation(value, withdrawOptionCrypto.code)) {
          setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
          setError({...error, crypto_address: false});
          setCryptoError(false);
        } else {
          if (!value.length) {
            setCryptoError(false);
            setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
            setError({...error, crypto_address: true});
          } else {
            setCryptoError(true);
            setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
            setError({...error, crypto_address: true});
          }
        }
      } else if ((name = 'code')) {
        if (withdrawOptionCrypto.crypto_address) {
          if (
            cryptoAddressValidation(withdrawOptionCrypto.crypto_address, value)
          ) {
            setError({...error, code: false, crypto_address: false});
            setCryptoError(false);
          } else {
            setError({...error, code: false, crypto_address: true});
            setCryptoError(true);
          }
        } else {
          setError({...error, code: false});
          setCryptoError(false);
        }
      }
    }
  };

  return [useHandleChange];
};

export default HandleChange;
