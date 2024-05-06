export const handleAccountNumber = (
  acc_number,
  name,
  setWithdrawOptionBank,
  withdrawOptionBank,
) => {
  const inputVal = acc_number.replace(/ /g, '');
  let inputNumbersOnly = inputVal.replace(/\D/g, '');

  if (inputNumbersOnly.length > 25) {
    inputNumbersOnly = inputNumbersOnly.substr(0, 25);
  }

  const splits = inputNumbersOnly.match(/.{1,4}/g);

  let spacedNumber = '';
  if (splits) {
    spacedNumber = splits.join(' ');
  }
  setWithdrawOptionBank({...withdrawOptionBank, [name]: spacedNumber});
};
