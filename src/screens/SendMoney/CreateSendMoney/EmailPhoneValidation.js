import {isValidNumber} from 'react-native-phone-number-input';
import {
  validateEmail,
  validationPhone,
} from '../../utilities/Validation/Validation';

export const doCheckValidity = (
  value,
  setSendMoney,
  sendMoney,
  isConnected,
  processedBy,
  email,
  setError,
  error,
  formattedPhone,
  trans,
) => {
  setSendMoney({...sendMoney, phone: value});
  if (isConnected) {
    if (validateEmail(value)) {
      setSendMoney({...sendMoney, [processedBy]: value});
      if (value === email) {
        setError({
          ...error,
          ownIdentity: trans('You cannot send money to yourself!'),
        });
      } else {
        setError({
          ...error,
          ownIdentity: '',
        });
      }
    } else if (
      validationPhone(value) ||
      isValidNumber(`+${sendMoney.code + value}`)
    ) {
      if (!formattedPhone) {
        setError({
          ...error,
          ownIdentity: trans('Please set your phone number first!'),
        });
      } else if (
        formattedPhone ===
        (isValidNumber(`+${sendMoney.code + value}`) && sendMoney.code
          ? `+${sendMoney.code + value}`
          : value)
      ) {
        setError({
          ...error,
          ownIdentity: trans('You cannot send money to yourself!'),
        });
      } else {
        setError({
          ...error,
          ownIdentity: '',
        });
        setSendMoney({...sendMoney, [processedBy]: value});
      }
    }
  }
};
