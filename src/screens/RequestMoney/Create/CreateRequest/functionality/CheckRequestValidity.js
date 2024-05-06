import {isValidNumber} from 'react-native-phone-number-input';
import {
  validateEmail,
  validationPhone,
} from '../../../../utilities/Validation/Validation';

export const checkValidRequest = ({
  value,
  setMoneyRequest,
  moneyRequest,
  setError,
  error,
  processedBy,
  isConnected,
  email,
  formattedPhone,
  trans,
}) => {
  setMoneyRequest({...moneyRequest, [processedBy]: value});
  if (isConnected) {
    if (!formattedPhone && processedBy === 'phone') {
      setError({
        ...error,
        ownIdentity: trans('Please set your phone number first!'),
      });
    }
    if (validateEmail(value)) {
      if (value === email) {
        setError({
          ...error,
          ownIdentity: trans('You cannot request money to yourself!'),
        });
      } else {
        setError({
          ...error,
          ownIdentity: '',
        });
      }
    } else if (
      validationPhone(value) ||
      isValidNumber(`+${moneyRequest.code + value}`)
    ) {
      if (
        formattedPhone ===
        (isValidNumber(`+${moneyRequest.code + value}`) && moneyRequest.code
          ? `+${moneyRequest.code + value}`
          : value)
      ) {
        setError({
          ...error,
          ownIdentity: trans('You cannot request money to yourself!'),
        });
      } else if (!formattedPhone) {
        setError({
          ...error,
          ownIdentity: trans('Please set your phone number first!'),
        });
      } else {
        setError({
          ...error,
          ownIdentity: '',
        });
      }
    }
  }
};
