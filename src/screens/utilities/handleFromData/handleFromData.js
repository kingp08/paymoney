import {validateEmail} from '../Validation/Validation';

export const handleSetInfo = (
  name,
  value,
  setInfoValue,
  infoValue,
  setError,
  error,
  setValidEmail,
  setEmailError,
) => {
  if (name) {
    if (name === 'email') {
      if (validateEmail(value)) {
        setInfoValue({
          ...infoValue,
          [name]: value,
        });
        setValidEmail(true);
        setEmailError(false);
      } else {
        if (value.length > 0) {
          setInfoValue({
            ...infoValue,
            [name]: value,
          });
          setValidEmail(false);

          setEmailError(true);
        } else {
          setInfoValue({
            ...infoValue,
            [name]: value,
          });
          setValidEmail(false);
          setEmailError(false);
        }
      }
    } else {
      setInfoValue({...infoValue, [name]: value});
    }
  } else {
    setInfoValue({
      ...infoValue,
      [name]: value,
    });
    setError({...error});
  }
};
